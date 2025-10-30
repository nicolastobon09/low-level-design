import { Node } from "./node";

export class DoublyLinkedList<K, V> {
    private readonly head: Node<K, V>;
    private readonly tail: Node<K, V>;

    constructor() {
        // Create dummy head and tail nodes with null values
        this.head = new Node<K, V>(null as any, null as any);
        this.tail = new Node<K, V>(null as any, null as any);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addFirst(node: Node<K, V>): void {
        node.next = this.head.next;
        node.prev = this.head;
        if (this.head.next) {
            this.head.next.prev = node;
        }
        this.head.next = node;
    }

    remove(node: Node<K, V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
    }

    moveToFront(node: Node<K, V>): void {
        this.remove(node);
        this.addFirst(node);
    }

    removeLast(): Node<K, V> | null {
        if (this.tail.prev === this.head) {
            return null;
        }
        const last = this.tail.prev;
        if (last) {
            this.remove(last);
        }
        return last;
    }
}