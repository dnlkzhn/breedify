# Breedify
Dog Breed Identification Using InceptionV3
This project implements a convolutional neural network (CNN) based on the InceptionV3 architecture to identify dog breeds from photographic images. Leveraging transfer learning and advanced preprocessing techniques, the model achieves robust performance with limited computational resources.

**Project Overview**<br>
The system comprises **three** main components:

**Model Development**: A fine-tuned InceptionV3 CNN for image classification.
**Mobile Application**: An Android app for real-time dog breed identification.
**Telegram Bot**: An interactive bot for quick and accessible breed classification.

**Features**
**Neural Network Model**
**Architecture**: Pre-trained InceptionV3 model with a custom classification head.<br>
**Transfer Learning**: Fine-tuned for optimal performance on a dataset of dog breeds.<br>
**Data Augmentation**: Techniques include rotations, shifts, shearing, zooming, and flipping to improve generalization.<br>

**Mobile Application**
Capture or upload images for classification.
Results include breed identification and confidence levels:
High Confidence (>70%): Reliable classification.
Moderate Confidence (50-70%): Informative but less certain.
Low Confidence (<50%): Limited reliability.
Telegram Bot
Upload images directly through Telegram for classification.
Provides breed identification with confidence scores, same as mobile application

**Methodology**
Data
Sources: Combined datasets from the Stanford Dogs Dataset and Kaggle Dog Breed Identification Dataset.
Preprocessing: Training data augmented with real-world variations; validation data rescaled without augmentation.
Model
Fine-tuned InceptionV3 architecture:
GlobalAveragePooling2D, BatchNormalization, Dropout, and Dense layers added.
Gradual unfreezing of layers for fine-tuning.
Training: Optimized using Adam optimizer with categorical crossentropy loss.
Evaluation Metrics
Accuracy, Precision, Recall, and F1 Score evaluated on training and validation datasets.

Applications
Mobile App: User-friendly interface for real-world use cases.
Telegram Bot: Seamless interaction for quick classification.
How to Use
Mobile App:

Install the APK file on an Android device.
Use the camera or gallery to classify dog breeds.
Telegram Bot:

Start a conversation with the bot.
Upload an image for instant classification.

Results
High accuracy achieved through transfer learning.
Robust performance despite limited training data and computational resources.
Future Work
Expand the dataset for improved accuracy across rare breeds.
Enhance the mobile and bot interfaces for better user experience.

