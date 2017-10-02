export class Widget {

    //fillColor: string;
    //methodName(g: Gadget): any{};
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
    font: string;
    widget: string;

    constructor() {
        super();
        this.title = "I am the Title";
        this.fillColor = "orange";
    }

    curry() {}
}

export class Subtitle  extends Widget {
    subtitle: string;
}

export class Ruby extends Widget {

    // ruby or furigana
}

export class Color extends Widget {
    name: string;
}

export class ColorLabel extends Color {

    getNounWidget(c: Color) {
        // name of the color
        return c.name;
    }

    getVerbWidget() {

    }
}