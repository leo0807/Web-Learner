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
