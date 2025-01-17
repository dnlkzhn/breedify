import Mustache from "./mustache.js";
import processOpnFrmData from "./addOpinion.js";

export default [
    {
        hash: "welcome",
        target: "router-view",
        getTemplate: (targetElm) =>
            document.getElementById(targetElm).innerHTML =
            document.getElementById("template-welcome").innerHTML
    },
    {
        hash: "articles",
        target: "router-view",
        getTemplate: fetchAndDisplayArticles
    },
    {
        hash: "opinions",
        target: "router-view",
        getTemplate: createHtml4opinions
    },
    {
        hash: "addOpinion",
        target: "router-view",
        getTemplate: (targetElm) => {
            document.getElementById(targetElm).innerHTML = document.getElementById("template-addOpinion").innerHTML;
    
            const opinionForm = document.getElementById("opnFrm");
            opinionForm.onsubmit = processOpnFrmData;

            if (isUserLoggedIn()) {
                const loggedInUser = getLoggedInUserData();
                const nameField = document.getElementById("nameElm");
                const emailField = document.getElementById("emailElm");
    
                nameField.value = loggedInUser.name;
                nameField.disabled = true; 
                if (emailField) {
                    emailField.value = loggedInUser.email;
                    emailField.disabled = true;
                }
            }
        }
    },
    {
        hash: "article",
        target: "router-view",
        getTemplate: fetchAndDisplayArticleDetail
    },
    {
        hash: "artInsert",
        target: "router-view",
        getTemplate: (targetElm) => {
            document.getElementById(targetElm).innerHTML = document.getElementById("template-article-form").innerHTML;
    
            // Перезапускаємо нейронний скрипт після завантаження шаблону
            import("./neuro.js").then(module => module.default());
        }
    }
    
    
];

const urlBase = "https://wt.kpi.fei.tuke.sk/api";
const articlesPerPage = 20;

function createHtml4opinions(targetElm) {
    const opinionsFromStorage = localStorage.myTreesComments;
    let opinions = [];

    if (opinionsFromStorage) {
        opinions = JSON.parse(opinionsFromStorage);
        opinions.forEach(opinion => {
            opinion.created = (new Date(opinion.created)).toDateString();
            opinion.willReturn =
                opinion.willReturn ? "I will return to this page." : "Sorry, one visit was enough.";
        });
    }

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        opinions
    );
}

function fetchAndDisplayArticles(targetElm, offsetFromHash = 0, totalCountFromHash = 0) {
    const offset = Number(offsetFromHash);
    const totalCount = Number(totalCountFromHash);

    const urlQuery = `?offset=${offset}&max=${articlesPerPage}`;
    const url = `${urlBase}/article${urlQuery}`;

    const reqListener = function () {
        if (this.status === 200) {
            const responseJSON = JSON.parse(this.responseText);

            const hasNext = offset + articlesPerPage < responseJSON.meta.totalCount;
            const hasPrevious = offset > 0;

            const templateData = {
                articles: responseJSON.articles.map(article => ({
                    ...article,
                    detailLink: `#article/${article.id}/${offset}/${responseJSON.meta.totalCount}`,
                })),
                hasNext,
                hasPrevious,
                nextPage: hasNext ? offset + articlesPerPage : null,
                previousPage: hasPrevious ? Math.max(offset - articlesPerPage, 0) : null,
            };

            document.getElementById(targetElm).innerHTML = Mustache.render(
                document.getElementById("template-articles").innerHTML,
                templateData
            );
        } else {
            document.getElementById(targetElm).innerHTML = Mustache.render(
                document.getElementById("template-articles-error").innerHTML,
                { errMessage: this.responseText }
            );
        }
    };

    const ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}

function fetchAndDisplayArticleDetail(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    if (!artIdFromHash) {
        document.getElementById(targetElm).innerHTML = "<p>Article ID is missing</p>";
        return;
    }

    const url = `${urlBase}/article/${artIdFromHash}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching article: ${response.statusText}`);
            }
            return response.json();
        })
        .then(articleData => {
            articleData.backLink = `#articles/${offsetFromHash}/${totalCountFromHash}`;
            articleData.editLink = `#artEdit/${artIdFromHash}/${offsetFromHash}/${totalCountFromHash}`;
            articleData.deleteLink = `#artDelete/${artIdFromHash}/${offsetFromHash}/${totalCountFromHash}`;

            const commentsKey = `comments_${artIdFromHash}`;
            let comments = JSON.parse(localStorage.getItem(commentsKey) || "[]");

            comments.forEach(comment => {
                comment.created = new Date(comment.created).toLocaleString();
            });

            articleData.comments = comments;

            document.getElementById(targetElm).innerHTML = Mustache.render(
                document.getElementById("template-article-comments").innerHTML,
                articleData
            );
   
            const toggleButton = document.getElementById("toggleCommentForm");
            const commentForm = document.getElementById("commentForm");

            toggleButton.addEventListener("click", () => {
                commentForm.classList.toggle("hidden");
            });

            if (isUserLoggedIn()) {
                const loggedInUser = getLoggedInUserData();
                document.getElementById("commentAuthor").value = loggedInUser.name;
            }

            commentForm.onsubmit = (event) => {
                event.preventDefault();

                const author = document.getElementById("commentAuthor").value.trim();
                const email = document.getElementById("commentEmail").value.trim();
                const content = document.getElementById("commentContent").value.trim();

                if (!author || !email || !content) {
                    alert("Please fill in all fields.");
                    return;
                }

                const newComment = {
                    author,
                    email,
                    content,
                    created: new Date().toISOString()
                };

                comments.push(newComment);
                localStorage.setItem(commentsKey, JSON.stringify(comments));

                fetchAndDisplayArticleDetail(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash);
            };
        })
        .catch(error => {
            document.getElementById(targetElm).innerHTML = `<p>Error loading article: ${error.message}</p>`;
        });
}

function insertArticle(targetElm) {
    const formData = {
        formTitle: "Add New Article",
        submitBtTitle: "Save article",
        backLink: "#articles/1/0",
        author: isUserLoggedIn() ? getLoggedInUserData().name : "",
        title: "",
        imageLink: "",
        content: "",
        tags: "",
    };

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-article-form").innerHTML,
        formData
    );

    applyAuthRestrictions(); 

    const form = document.getElementById("articleForm");
    form.onsubmit = function (e) {
        e.preventDefault();

        const author = document.getElementById("author").value.trim();
        const title = document.getElementById("title").value.trim();
        const imageLink = document.getElementById("imageLink").value.trim();
        const content = document.getElementById("content").value.trim();
        const tags = document.getElementById("tags").value.trim();

        const data = {
            author,
            title,
            imageLink,
            content,
            tags: tags.split(",").map(t => t.trim()),
        };

        fetch("https://wt.kpi.fei.tuke.sk/api/article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to save article");
                return response.json();
            })
            .then(createdArticle => {
                alert("Article inserted successfully!");
                window.location.hash = `#article/${createdArticle.id}/0/0`;
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
    };
}

function isUserLoggedIn() {
    const userFirstName = localStorage.getItem("userFirstName");
    const userLastName = localStorage.getItem("userLastName");
    const userEmail = localStorage.getItem("userEmail");
    return userFirstName && userLastName && userEmail;
}


