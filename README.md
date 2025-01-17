# Breedify
**Dog Breed Identification Using InceptionV3**<br>
This project implements a convolutional neural network (CNN) based on the InceptionV3 architecture to identify dog breeds from photographic images. Leveraging transfer learning and advanced preprocessing techniques, the model achieves robust performance with limited computational resources.

**Project Overview**<br>
The system comprises **three** main components:

**Model Development**: A fine-tuned InceptionV3 CNN for image classification.<br>
**Mobile Application**: An Android app for real-time dog breed identification.<br>
**Telegram Bot**: An interactive bot for quick and accessible breed classification.<br>

**Features**<br>
**Neural Network Model**
**Architecture**: Pre-trained InceptionV3 model with a custom classification head.<br>
**Transfer Learning**: Fine-tuned for optimal performance on a dataset of dog breeds.<br>
**Data Augmentation**: Techniques include rotations, shifts, shearing, zooming, and flipping to improve generalization.<br>

**Mobile Application**<br>
Capture or upload images for classification.<br>
Results include breed identification and confidence levels:<br>
&nbsp;&nbsp;&nbsp;&nbsp;High Confidence (>70%): Reliable classification.<br>
&nbsp;&nbsp;&nbsp;&nbsp;Moderate Confidence (50-70%): Informative but less certain.<br>
&nbsp;&nbsp;&nbsp;&nbsp;Low Confidence (<50%): Limited reliability.<br>
**Telegram Bot**<br>
Upload images directly through Telegram for classification.<br>
Provides breed identification with confidence scores, same as mobile application.<br>

**Methodology**<br>
**Data Sources**: Combined datasets from the Stanford Dogs Dataset and Kaggle Dog Breed Identification Dataset.<br>
**Preprocessing**: Training data augmented with real-world variations; validation data rescaled without augmentation.<br>
**Model**<br>
Fine-tuned InceptionV3 architecture:<br>
&nbsp;&nbsp;&nbsp;&nbsp;GlobalAveragePooling2D;<br>
&nbsp;&nbsp;&nbsp;&nbsp;BatchNormalization;<br>
&nbsp;&nbsp;&nbsp;&nbsp;Dropout;<br>
&nbsp;&nbsp;&nbsp;&nbsp;Dense;<br>
&nbsp;&nbsp;&nbsp;&nbsp;Gradual unfreezing of layers for fine-tuning.<br>
&nbsp;&nbsp;&nbsp;&nbsp;Training: Optimized using Adam optimizer with categorical crossentropy loss.<br>
**Evaluation Metrics**:
Accuracy, Precision, Recall, and F1 Score evaluated on training and validation datasets.<br>

**Applications**<br>
**Mobile App**: User-friendly interface for real-world use cases.<br>
**Telegram Bot**: Seamless interaction for quick classification.<br>

**How to Use Mobile App:**
Install the APK file on an Android device.
Use the camera or gallery to classify dog breeds.

**How to Use Telegram Bot:**<br>
Start a conversation with the bot.<br>
Upload an image for instant classification.<br>

**Results**:<br>
Using testing data that contains 6384 photos of 120 dog breeds and confidence threshold set to 0.7 model managed to get this results on evaluation metrics:<br>
&nbsp;&nbsp;&nbsp;&nbsp;**Accuracy** - 95.34%<br>
&nbsp;&nbsp;&nbsp;&nbsp;**Precision** - 0.95<br>
&nbsp;&nbsp;&nbsp;&nbsp;**Recall** - 0.98<br>
&nbsp;&nbsp;&nbsp;&nbsp;**F1-score** - 0.97<br>
