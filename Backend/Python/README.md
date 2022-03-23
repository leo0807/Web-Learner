# Python

## REST API 优势

1. REST APIs offer simple and standardized approach to communication. You don’t have to worry about how to format your data or how to format your request each time — it’s all standardized and industry used.

2. REST APIs are scalable and stateless. As your service grows in complexity, you can easily make modifications. Additionally, because of them being stateless, you don’t have to worry about what data is in which state or keep track of that across client and server. It’s truly stateless.

3. REST APIs have high performance in large part due to the fact that they support caching. So even when your service gets more complex, the performance stays very high.

1) Client-Server: In REST API design, client and server applications must be completely independent of each other. This creates a separation of concerns, letting each application grow and scale independently of the other and allowing your organization to grow quickly and efficiently.

2) Stateless: REST APIs are stateless, meaning that each request needs to include all the information necessary for processing it. A REST API should not rely on data being stored on the server or sessions to determine what to do with a call, but should rather solely rely on the data that is provided in that call itself. It means that no data is stored on the server related to the client request.

3) Cache: When possible, resources should be cacheable on the client or server-side. The goal is to improve performance on the client-side while increasing scalability on the server-side.

4) Uniform interface: The uniform interface lets the client talk to the server in a single language, independent of the architectural back-end of either.

5) Layered system: Don’t assume that the client and server applications connect directly to each other. There may be a number of different intermediaries in the communication loop. REST APIs need to be designed so that neither the client nor the server can tell whether it communicates with the end application or an intermediary.

6) Code on demand (optional): REST APIs usually send static resources, but in certain cases, responses can also contain executable code (such as Java applets). In these cases, the code should only run on-demand.

## FastAPI

1.

## Azure
- Feature
  1. It’s a fully managed environment, which means it can automatically perform patching and maintains the operating system and language frameworks for you. You get the time to focus on designing, developing, and maintaining your application and its data.

  2. As we already discussed, Azure App Services supports a wide variety of programming languages and frameworks like `.NET`, `.NET Core`, `Java`, `Ruby`, `Node.js`, `PHP` or `Python`. You can also run Powershell and other scripts or executables as background services.

  3. Scalability is another great benefit. Based on the demand for your application, the app service can scale resources up and down or in and out. You can do this either manually or automatically based on metrics like CPU utilization.

  4. From a compliance standpoint, app service is ISO, SOC, and PCI compliant.

  5. From a security standpoint, you can authenticate users with Azure Active Directory or any of the external authentication providers like Google, Facebook, Twitter, or Microsoft.

  6. You can even host a custom Windows or Linux container in the app service. So, if you want to, you can dockerize your application and host it in the app service. You can also run multi-container apps with docker-compose.

  7. Devops automation and optimization is another benefit. You can easily set up CI/CD which is continuous integration and deployment with Azure DevOps, GitHub, Bitbucket, Docker Hub, or Azure Container Registry.

  8. If you still have some of your data on your on-premise servers, you can still access it using hybrid connections and Azure virtual networks. Azure App Services provides support for accessing on-premise data as well.

- Azure Cognitive Services
  1. Cognitive Services brings AI within reach of every developer- without requiring machine-learning expertise. All it takes is an API call to embed the ability to see, hear, speak, search, understand and accelerate decision-making into your apps.
  2. Advantages of Azure Cognitive Services#
    - Easy adoption and minimal development effort: Azure Cognitive Services do not require machine learning expertise to build Al solutions. You just need to call a simple API, and the pre-trained AI model will help you incorporate AI capabilities within your application.
    - Cross-platform support: Since the Azure Cognitive Services support devices and platforms across Windows, iOS, and Android, developers can use any language (C#, Python, Java, Node.js, etc.) to easily integrate the technology in their applications.
    - Rich user experiences: The decision services such as the Personalizer and Content Moderator helps create better user experiences and ensure that any offensive or unwanted content is processed appropriately to provide an engaging and intuitive user experience.
    - Extract deeper insights quickly: The Vision API’s computer vision, custom vision, face, form, and ink recognizer help extract deeper insights from any form of data.
  3. Pillars of Azure Cognitive Services#
    - Vision
    - Speech
    - Language
    - Decision
- Azure Application Insights
  1. Application Insights is an Application Performance Management service (which comes as a feature of Azure Monitor) for web applications that enables you to monitor your website performance in Azure.
