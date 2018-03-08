interface IWidget {
    [key: string]: any
}

export class Widget implements IWidget {
    name: string;
    funktion: Function;

    addProperty(widget: Widget, property: string) : Widget {
        return null;
    }

    getFunktion() {
        return this.funktion;
    }
}

export class Banner extends Widget {
    rectangle: Rectangle;
    title: Title;
    subtitle: Subtitle;
}

export class Rectangle extends Widget {
    rectW: number;
    rectH: number;
}

export class Title extends Widget {
    title: string;
    fillColor: string;
    borderColor: string;
    font: string;

    constructor() {
        super();
        this.title = "I am the Title";
        this.fillColor = "orange";
    }

    getContextualSemantics() {
        return "orange";
    }
}

export class Subtitle  extends Widget {
    subtitle: string;
}

export class Ruby extends Widget {

    // ruby or furigana
}

export class Color extends Widget {
    public name: string;

    constructor() {
        super();
    }
}

export class ColorLabel extends Widget {
    constructor() {
        super();
        this.funktion = function(s: string) {return s;}
    }
}