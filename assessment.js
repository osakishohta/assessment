(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = () => {
        console.log('ボタンが押されました。');
        const userName = userNameInput.value;

        if (userName.length === 0) {
            return;
        }
        console.log(userName);

        //診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();

    };

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
        }
    };

    const answers = [
        '{userName} 声',
        '{userName} まなざし',
        '{userName} 情熱',
        '{userName} 厳しさ',
        '{userName} 知識',
        '{userName} ユニークさ',
        '{userName} 用心深さ',
        '{userName} 見た目',
        '{userName} 決断力',
        '{userName} 思いやり',
        '{userName} 感受性',
        '{userName} 節度',
        '{userName} 好奇心',
        '{userName} 気配り',
        '{userName} その全て',
        '{userName} 自制心'
        '{userName} 優しさ'
    ];

    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */

    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sum0fcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sum0fcharCode = sum0fcharCode + userName.charCodeAt(i);
        }
        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sum0fcharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);

        return result;
    }

    console.log(assessment('太郎'));
    console.assert(
        assessment('太郎') === 'ji郎 決断力',
        '診断結果の文言の特定部分を名前に置き換える処理が正しくありません。'
    );


})();

