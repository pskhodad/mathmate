import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as katex from 'katex';

@Component({
  selector : 'katex',
  template : `
  <span [innerHTML]="outTex" style="font-size: 1.2em;"></span>
  `
})
export class KatexCmp {

  @Input() inTex;
  public outTex: any;

  constructor(
    private sanitizer:DomSanitizer
  ) {
  }

  ngOnInit() {
    this.outTex = this.sanitizer.bypassSecurityTrustHtml(this.tex2katex(this.inTex));
  }

  /* eslint no-constant-condition:0 */
  private findEndOfMath(delimiter, text, startIndex) {
    // Adapted from
    // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
    var index = startIndex;
    var braceLevel = 0;

    var delimLength = delimiter.length;

    while (index < text.length) {
      var character = text[index];

      if (braceLevel <= 0 &&
        text.slice(index, index + delimLength) === delimiter) {
        return index;
      } else if (character === "\\") {
        index++;
      } else if (character === "{") {
        braceLevel++;
      } else if (character === "}") {
        braceLevel--;
      }

      index++;
    }

    return -1;
  };

  private splitAtDelimiters(startData, leftDelim, rightDelim, display) {
    var finalData:any = [];

    for (var i = 0; i < startData.length; i++) {
      if (startData[i].type === "text") {
        var text = startData[i].data;

        var lookingForLeft = true;
        var currIndex = 0;
        var nextIndex;

        nextIndex = text.indexOf(leftDelim);
        if (nextIndex !== -1) {
          currIndex = nextIndex;
          finalData.push({
            type: "text",
            data: text.slice(0, currIndex),
          });
          lookingForLeft = false;
        }

        while (true) {
          if (lookingForLeft) {
            nextIndex = text.indexOf(leftDelim, currIndex);
            if (nextIndex === -1) {
              break;
            }

            finalData.push({
              type: "text",
              data: text.slice(currIndex, nextIndex),
            });

            currIndex = nextIndex;
          } else {
            nextIndex = this.findEndOfMath(
              rightDelim,
              text,
              currIndex + leftDelim.length);
            if (nextIndex === -1) {
              break;
            }

            finalData.push({
              type: "math",
              data: text.slice(
                currIndex + leftDelim.length,
                nextIndex),
              rawData: text.slice(
                currIndex,
                nextIndex + rightDelim.length),
              display: display,
            });

            currIndex = nextIndex + rightDelim.length;
          }

          lookingForLeft = !lookingForLeft;
        }

        finalData.push({
          type: "text",
          data: text.slice(currIndex),
        });
      } else {
        finalData.push(startData[i]);
      }
    }

    return finalData;
  };

  private splitWithDelimiters(text, delimiters) {
    var data = [{ type: "text", data: text }];

    for (var i = 0; i < delimiters.length; i++) {
      var delimiter = delimiters[i];
      data = this.splitAtDelimiters(
        data, delimiter.left, delimiter.right,
        delimiter.display || false);
    }
    return data;
  };

  private delimiters = [
    { left: "$$", right: "$$", display: true },
    //{ left: "\\[", right: "\\]", display: true },
    //{ left: "\\(", right: "\\)", display: false },
    // LaTeX uses this, but it ruins the display of normal `$` in text:
    // {left: "$", right: "$", display: false},
  ];

  private tex2katex(inTex) {
    if (typeof inTex === "number") {
      inTex = inTex.toString();
    }
    let tokens = this.splitWithDelimiters(inTex, this.delimiters);
    return tokens.reduce((prevVal, currVal)=>{
      if (currVal.type === "text") {
        return prevVal + '<span>'+currVal.data+'</span>';
      } else {
        return prevVal + katex.renderToString(currVal.data);
      }
    }, "");
  }

}

