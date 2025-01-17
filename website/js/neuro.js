// export default function initializeNeuro() {
//     const uploadBtn = document.getElementById("uploadBtn");
//     const imageInput = document.getElementById("imageInput");
//     const imagePreview = document.getElementById("imagePreview");
//     const analysisResult = document.getElementById("analysisResult");

//     if (!uploadBtn || !imageInput || !imagePreview || !analysisResult) return;

//     imageInput.addEventListener("change", function () {
//         const file = imageInput.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 imagePreview.style.display = "block";
//                 imagePreview.src = e.target.result;
//             };
//             reader.readAsDataURL(file);
//         }
//     });

//     uploadBtn.addEventListener("click", async function () {
//         const file = imageInput.files[0];
//         if (!file) {
//             alert("Будь ласка, виберіть зображення.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch("http://127.0.0.1:5000/analyze", {
//                 method: "POST",
//                 body: formData
//             });

//             if (!response.ok) throw new Error(`Error: ${response.status}`);

//             const data = await response.json();
//             if (data.result) {
//                 analysisResult.innerText = `Прогнозована порода: ${data.result}`;
//             } else {
//                 analysisResult.innerText = "Не вдалося визначити породу.";
//             }
//         } catch (error) {
//             analysisResult.innerText = `Помилка: ${error.message}`;
//         }
//     });
// }


export default function initializeNeuro() {
    const uploadBtn = document.getElementById("uploadBtn");
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const breedName = document.getElementById("breedName");

    if (!uploadBtn || !imageInput || !imagePreview || !breedName) return;

    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.style.display = "block";
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    uploadBtn.addEventListener("click", async function () {
        const file = imageInput.files[0];
        if (!file) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            if (data.result) {
                breedName.innerText = `I think it is... \n${data.result}`;
            } else {
                breedName.innerText = "The breed could not be determined.";
            }
        } catch (error) {
            breedName.innerText = `Error: ${error.message}`;
        }
    });
}

document.addEventListener("DOMContentLoaded", initializeNeuro);