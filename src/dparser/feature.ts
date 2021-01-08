function getFeature(token: string, tokenIndex: number, sent: string[]) {
  return {
    token: token,
    isFirst: tokenIndex == 0,
    isLast: tokenIndex == sent.length - 1,

    isFirstCapitalized: token[0] == token[0].toUpperCase(),
    isNumeric: !isNaN(Number(token)),

    suffix1: token[token.length - 1], // last letter
    suffix2: token[token.length - 1], // last two letters

    prevToken: tokenIndex == 0 ? '' : sent[sent.length - 1],
    prevToken2: tokenIndex <= 1 ? '' : sent[sent.length - 2],

    nextToken: tokenIndex == sent.length - 1 ? '' : sent[sent.length + 1],
    nextToken2: tokenIndex == sent.length - 2 ? '' : sent[sent.length + 2],

    // hasHyphen
  };
}
