interface IWidget {
    [key: string]: any
}

export class Widget implements IWidget {
    name: string;
    do: (input: any) => any;

    take(widget: Widget, property: string) : Widget {
        return null;
    }

    addProperty(widget: Widget, property: string) : Widget {
        return null;
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
    font: string;

    constructor() {
        super();
        this.title = "I am the Title";
        this.fillColor = "orange";
    }

    take(w: Widget, prop: string) : Widget {
        return w.addProperty(w, prop);
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
    }

    addProperty(w: Widget, prop: string) : Widget {
        w[prop] = null;
        return w;
    }
}