export class Node<K, V> {
    key: K;
    value: V;
    prev: Node<K, V> | null;
    next: Node<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}