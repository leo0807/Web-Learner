class PubSub{
    constructor() {
        this.subscribers = [];
    }
    subscriber(topic, callback) {
        let callbacks = this.subscribers[topic];
        if (!callbacks) {
            this.subscribers[topic] = [callback];
        }
        else {
            callbacks.push(callback);
        }
    }

    publisher(topic, ...args) {
        
    }
}