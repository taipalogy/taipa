export class Feature {
  token: string = '';
  isFirst: boolean = false;
  isLast: boolean = false;

  isFirstCapitalized: boolean = false;
  isNumeric: boolean = false;

  suffix1: string = ''; // last letter
  suffix2: string = ''; // last two letters

  prevToken: string = '';
  prevToken2: string = '';

  nextToken: string = '';
  nextToken2: string = '';

  // hasHyphen
}

export function getFeature(token: string, tokenIndex: number, sent: string[]) {
  const feature: Feature = {
    token: token,
    isFirst: tokenIndex == 0,
    isLast: tokenIndex == sent.length - 1,

    isFirstCapitalized: token[0] == token[0].toUpperCase(),
    isNumeric: !isNaN(Number(token)),

    suffix1: token[token.length - 1], // last letter
    suffix2: token[token.length - 2] + token[token.length - 1], // last two letters

    prevToken: tokenIndex == 0 ? '' : sent[tokenIndex - 1],
    prevToken2: tokenIndex <= 1 ? '' : sent[tokenIndex - 2],

    nextToken: tokenIndex == sent.length - 1 ? '' : sent[tokenIndex + 1],
    nextToken2: tokenIndex >= sent.length - 2 ? '' : sent[tokenIndex + 2],
  };
  return feature;
}
