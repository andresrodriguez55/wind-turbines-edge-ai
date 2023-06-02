 <h1>1. Introduction</h1>
    <p>
        Today, the use and production of accurate and effective energy is increasing day by day. However, the majority of energy production is still made from non-renewable sources such as carbon, oil and natural gas. This situation leads to a decrease in the relevant resources. In addition, more energy needs arise in the world due to reasons such as population growth and technology development. For this reason, more use of carbon-based resources will lead to the depletion of these resources in the future. In addition, it should not be forgotten that fossil fuels such as oil and coal cause ecological pollution. For this reason, it has become inevitable to seek and use more harmless and renewable resources. Renewable resources can result in unlimited energy production and do not cause any harm to nature. For this reason, in recent years, we frequently see and use renewable resources such as geothermal, solar, wave and wind.
    </p>
    <p>
        Wind turbines are used to generate wind energy. Errors can be encountered during the use of wind turbines. These errors can be external or internal. Some errors are:
    </p>
     <ul>
         <li>External error types
             <ul>
                 <li>Bird strike</li>
                 <li>Rains</li>
                 <li>Lightning Strike</li>
                 <li>Delamination</li>
             </ul>
         </li>
         <li>Internal error types
             <ul>
                 <li>Electrical faults</li>
                 <li>Mechanical malfunctions</li>
             </ul>
         </li>
     </ul>
     <p>
    Detecting errors, monitoring the components of the wind turbine, and being prepared for future detectable errors are inevitable.
</p>
<p>
    Different approaches such as distributed architectures, artificial intelligence, edge AI, data mining, and user-server focused architectures are commonly used in the energy sector today. These approaches offer effective solutions in important areas such as energy production, data analysis and prediction, and energy management.
</p>
<p>
    Techniques such as genetic algorithms, dimensionality reduction, and artificial neural network optimization are frequently used in the energy sector.
</p>
<p>
    As a hybrid solution, proposing a system that combines these different approaches can be effective. For example, using a distributed architecture, data can be collected and shared in energy facilities. With artificial intelligence and data mining techniques, these data can be analyzed to make energy demand predictions and detect errors. Data preprocessing operations and genetic algorithms can be used for dimensionality reduction and improving artificial neural networks in the used datasets. Real-time error detection and decision-making can be performed using edge AI. User-server focused architectures can facilitate users' access to and management of energy data.
</p>
<h1>2. Method</h1>
<div class="image-container">
    <img src="https://drive.google.com/uc?id=1HKPZ_JeZQ7xjyCmzQkezextToWJ0b0IS" alt="architecture" >
</div>
<h2>2.1. Data Mining</h2>
<p>
    The datasets used for the system were subjected to data preprocessing processes. These processes include cleaning, integration, transformation, parsing, and normalization.
</p>
<h3>2.1.1. Feature Reduction</h3>
<p>
    Since there are multiple features in the datasets, dimensionality reduction processes were also performed. For dimensionality reduction, ANOVA tests, correlation analyses, and box plot analyses were conducted.
</p>
<p>
    Genetic algorithms were used as finding the most effective features is quite challenging.
</p>
<p>
    Information Gain, Akaike Information Criterion, and supervised machine learning algorithms were used to determine the fitness values in genetic algorithms.
</p>

<p>
    Information Gain measures the ability of a feature to reduce the uncertainty in the dataset. By selecting a feature, the homogeneity between classes increases and the uncertainty decreases. In other words, the selected feature makes the dataset more classifiable.
</p>

<p>
    Akaike Information Criterion combines the fit and complexity of a model. The AIC value of a model represents the balance between the model's ability to fit well and the trade-off between overfitting and underfitting.
</p>

<p>
    Since supervised machine learning algorithms were used in practice, relevant algorithms can be used in feature selection.
</p>

<h3>2.1.2. Weight Optimization in Artificial Neural Networks</h3>
<p>
    A simple neural network with a small number of sensors and hidden layers was used in the model development.
    The aim is to demonstrate the usability of a simpler neural network instead of complex neural networks used today.
</p>
<p>
    Genetic algorithms were used to optimize the weights of the connections in the neural network
    to deepen the optimization.
</p>
    <h2>2.2. Edge AI</h2>
<p>
    The edge AI architecture to be used to increase the efficiency of the study has been experienced in a software simulation environment, focusing on edge server-oriented sub-architecture type. The collected data is stored in the cloud environment, and the status of wind turbines is presented to the experts in real-time through user interfaces.
</p>

<h3>2.2.1. Applied Architecture - Edge Server-Oriented Computing</h3>
<div class="image-container">
    <img src="https://drive.google.com/uc?id=1vkrCgNrZ2iddMGITefNrSMLNaFdNAeLV" alt="Edge AI Arch" width="20%">
</div>
<p>
    The edge server-oriented computing sub-architecture of the edge AI architecture has been applied. It is performed in edge servers located close to the edge AI device, similar to edge computing in an edge network. This allows the edge device to send data to the edge server for processing and returning results. The advantages of this architecture include higher processing power and memory compared to a fully cloud-based architecture, higher accuracy and efficiency, and lower latency. However, this may require more investment in network infrastructure and edge servers.
</p>

<h4>2.2.1.1. Edge Client - Edge Collecting Sensor Data</h4>
<p>
    The edge client is responsible for sending sensor data to the edge server. This edge device should be connected to a local network to communicate with the edge server. The edge client uses an API to send data to the edge server. Since less complex artificial intelligence models are used, the artificial intelligence is performed in these edges.
</p>
<div class="image-container">
    <img src="https://drive.google.com/uc?id=1TISBhS3GlxjhNv0YU7s7w0cnLMPRTHDd" alt="Edge AI client node" width="75%">
</div>
<p>
    ESP32s are used for edge clients. The artificial intelligence models have been converted to C code and run on ESP32s. The software for ESP32s has been experienced in a software simulation environment.
</p>

<h4>2.2.1.2. Edge Server</h4>
<p>
    Edge servers only run their REST APIs in local networks to enhance security. These REST APIs only accept POST requests. These requests will receive sensor data from wind turbines and fault condition values predicted by artificial intelligence models.
</p>
<p>
    The REST APIs of edge servers have been developed with a minimalist approach. FastAPI has been used for the implementation of these APIs to work quickly and not burden the computation unit.
</p>

<h2>2.3. User-Oriented Applications</h2>

<h3>2.3.1. API</h3>
<div class="image-container">
    <img src="https://i.stack.imgur.com/H7oyH.jpg" alt="API Layer" width="20%">
</div>
<p>
    In contrast to architectures like MVC, it is planned to integrate future different interfaces into these API services. Server APIs compatible with the layered architecture have been developed considering the needs of end-users.
</p>
<p>
    The applied architecture ensured the preservation of class principles commonly used in the industry. APIs developed in accordance with the S.O.L.I.D and GRASP principles provide flexibility against future changes.
</p>
<p>
    APIs developed in accordance with the monolithic architecture were implemented using widely used technologies today. Technologies such as Spring, Spring Data, ModelMapper, Lombok, Swagger, and Hibernate were used.
</p>

<h4>2.3.1.1. Increasing Security</h4>
<div class="image-container">
    <img src="https://drive.google.com/uc?id=1kAEoW-Tya95Qnj0atkss15dO2qzQUtau" alt="ui 1" >
</div>
<p>Json web tokens have been implemented to increase data security. The data of the jwt base will be controlled to the data of the users that are in the database, additionally the time of completion of the tokens will be controlled. Additionally, user passwords are encrypted in the databases.</p>

<h3>2.3.2. Interface</h3>
<div class="image-container">
    <img src="https://drive.google.com/uc?id=1aKWsstPH7mFOthTfmzdgxbYay02fT-0V" >
    <img src="https://drive.google.com/uc?id=1YADPpn40UMp5iF8GmZ4MRiZ9zZHNbs2q">
<img src="https://drive.google.com/uc?id=1KtLTqfG9Y20W53WrfscbtXN-4fgn_j1d" >
 <img src="https://drive.google.com/uc?id=16hNfkCnDnPjHotrUmNXXRO39SYLVLr0O" >
 <img src="https://drive.google.com/uc?id=1Tcx440kc3nJFlt3KvPqht1ArftXiFAIr" >
</div>
<p>
    The application has a web interface. React technology, widely used in the industry, was used to reduce development time. The MUI component library was used to further accelerate development. Design patterns have been implemented for some components.
</p>
