/**
访问者模式允许在不改变对象本身的结构的情况下定义对对象集合的新操作。这允许我们将类与其实现的逻辑分开。

额外的操作可以封装在一个访问者对象中。对象可以有一个接受访问者对象的访问方法。
然后访问者可以进行所需的更改并对接收它的对象执行操作。这允许开发人员进行未来的扩展，扩展库/框架等。

- 使用场景
1. 需要对一个数据结构的不同对象进行类似的操作
2. 需要对数据结构中的不同对象进行具体操作
3. 需要为库或框架添加可扩展性
- 优点
1. 符合单一职责原则
2. 优秀的扩展性
3. 灵活性
- 缺点
1. 具体元素对访问者公布细节，违反了迪米特原则
2. 违反了依赖倒置原则，依赖了具体类，没有依赖抽象。
3. 具体元素变更比较困难
 */

// E.g.1
class Visitor {
    visit(item) { }
}

class BookVisitor extends Visitor {
    visit(book) {
        var cost = 0;
        if (book.getPrice() > 50) {
            cost = book.getPrice() * 0.50
        }
        else {
            cost = book.getPrice()
        }
        console.log("Book name: " + book.getName() + "\n" + "ID: " + book.getID() + "\n" + "cost: " + cost);
        return cost;
    }
}

class Book {
    constructor(id, name, price) {
        this.id = id
        this.name = name
        this.price = price
    }
    getPrice() {
        return this.price
    }
    getName() {
        return this.name
    }
    getID() {
        return this.id
    }
    accept(visitor) {
        return visitor.visit(this)
    }
}

var visitor = new BookVisitor()
var book1 = new Book("#1234", "lordOftheRings", 80)
book1.accept(visitor)

// E.g.2
class RockMusicVisitor {
    visit(musicLibrary) {
        var rockPlayList = [];
        var index = 0;
        var songlist = musicLibrary.songsList.length
        for (var i = 0; i < songlist; i++) {
            var song = musicLibrary.songsList[i]
            if (song.getGenre() == "Rock") {
                rockPlayList[index] = song.getName()
                index++
            }
        }
        return rockPlayList
    }
}

class Song {
    constructor(name, genre) {
        this.name = name
        this.genre = genre
    }

    getName() {
        return this.name
    }
    getGenre() {
        return this.genre
    }
}

class MusicLibrary {
    constructor() {
        this.songsList = []
    }
    addSong(song) {
        this.songsList.push(song)
    }
    accept(visitor) {
        return visitor.visit(this)
    }
}