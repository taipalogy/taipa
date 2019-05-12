
export abstract class Result {
    successful: boolean
    messages: Array<string>
}

export class Success extends Result {
    successful = true
    messages = new Array()
}

export class NoSuccess extends Result {
    successful = false
    messages = new Array()
}