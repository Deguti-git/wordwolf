//グローバル変数
let words_array = [];
let playercount = 0;
let showed_cnt = 0;
let wolfShown = false;
let wolfword = "";
let villagerword = "";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//最初の画面へ移動、使用する配列と単語を決定
function Gotofirstwordspage(){
    playercount = parseInt(document.getElementById("player-count").value);
    document.getElementById("start-page").style.display = "none";
    document.getElementById("first-words-page").style.display = "block";

    //配列の宣言
    const fruits=["りんご","いちご","ぶどう","メロン","バナナ","パイナップル","みかん","キウイ","レモン","桃"];
    const vegetable=["トマト","ピーマン","ブロッコリー","とうもろこし","キャベツ","じゃがいも","ナス","にんじん"];
    const sports=["野球","サッカー","バスケ","卓球","テニス","バレーボール"];
    const school=["国語","英語","数学","理科","社会","体育","美術","音楽","保険体育","歴史"];
    const hobby=["鬼ごっこ","かくれんぼ","だるまさんが転んだ","ケイドロ","ドッジボール"];
    const love=["容姿がいい人","優しい人","真面目な人","面白い人","お金持ちな人","頭がいい人","ポジティブな人"];
    const noodle=["ラーメン","うどん","そば","そうめん","焼きそば","パスタ"];
    const vehicle=["自転車","電車","新幹線","バス","飛行機","タクシー","バイク"];
    const smallanimal=["猫","犬","うさぎ","ハムスター","モルモット","リス"];
    const biganimal=["ライオン","ゾウ","キリン","パンダ","シロクマ","ライオン","トラ"];
    const ability=["ワープできる","過去に戻れる","透明になれる","空を飛べる","未来に行ける","時間を止められる","心が読める"];
    const electronics=["テレビ","エアコン","洗濯機","冷蔵庫","電子レンジ","ドライヤー","掃除機","ストーブ"];
    const tea=["麦茶","紅茶","緑茶","ウーロン茶","コーヒー","抹茶"];
    const music=["ギター","ベース","ドラム","ピアノ","バイオリン","トランペット"];
    const fish=["マグロ","うなぎ","シャケ","フグ","サンマ","メダカ"];
    const city=["東京","大阪","神奈川","北海道","千葉","京都","沖縄","愛知"];
    const food=["カレー","ラーメン","ハンバーガー","ピザ","ハンバーグ","オムライス","たこ焼き","お好み焼き"];
    const sweets=["ショートケーキ","チーズケーキ","プリン","カステラ","シュークリーム","パフェ","モンブラン","チョコレート","ドーナツ"];
    const bird=["カラス","ハト","インコ","すずめ","フクロウ","ひよこ","ニワトリ"];
    const beatle=["カブトムシ","バッタ","カマキリ","とんぼ","クワガタ","コオロギ","ゴキブリ"];
    const anime=["ドラえもん","クレヨンしんちゃん","サザエさん","ちびまる子ちゃん","アンパンマン","おじゃる丸"];
    const foodshop=["マクドナルド","モスバーガー","ケンタッキー","すき家","はま寿司","サイゼリヤ","スターバックス"];
    const alcol=["ビール","ワイン","カクテル","レモンサワー","ウイスキー","日本酒"];
    const country=["アメリカ","中国","韓国","イタリア","インド","フランス","エジプト"];
    const spicy=["塩","醤油","味噌","ケチャップ","ワサビ","コショウ","マヨネーズ","お酢"];

    //使用する配列を決める
    const all_arrays=[fruits,vegetable,sports,school,hobby,love,noodle,vehicle,smallanimal,biganimal,ability,electronics,tea,music,fish,city,food,sweets,bird,beatle,anime,foodshop,alcol,country,spicy];
    const arrayjudge=Math.floor(Math.random() * all_arrays.length);
    const usingarray=all_arrays[arrayjudge];
    
    //狼、市民の単語を決めるインデックス
    const wolfjudge=Math.floor(Math.random() * usingarray.length);
    let villagerjudge=Math.floor(Math.random() * usingarray.length);

    while(wolfjudge===villagerjudge){
        villagerjudge=Math.floor(Math.random() * usingarray.length);
    }

    //狼、市民の単語を決める
    wolfword=usingarray[wolfjudge];
    villagerword=usingarray[villagerjudge];

    // 配列の作成とシャッフル
    words_array = [wolfword];
    for (let i = 1; i < playercount; i++) {
        words_array.push(villagerword);
    }
    shuffle(words_array);

    //デバッグ
    console.log("狼の単語: " + wolfword);
    console.log("市民の単語: " + villagerword);
    console.log("使用する配列:"+words_array);
    console.log("Gotofirstwordspageが実行されました");

}

//単語と次のボタンを表示

function Firstshowwords(){
    const wordDisplay = document.getElementById("word");
    let randomWord = words_array[showed_cnt];
    if (randomWord===wolfword) {
        wolfShown=true;
    }
    wordDisplay.textContent = randomWord;
    document.getElementById("show").style.display = "block";
    document.getElementById("first-button").style.display = "none";
    showed_cnt++;

    //デバッグ
    console.log("表示された単語:", randomWord);
    console.log("Firstshowwordsが実行されました");
}

function Showwords() {

    // player-indicator を最初に非表示にする
    const playerIndicator = document.getElementById("player-indicator");
    if (playerIndicator) {
        playerIndicator.style.display = "none";
    }

    // 最後の単語を表示した場合、次に遷移
    if (showed_cnt >= playercount) {
        Gotolastpage();
        return;
    }

    // 単語を表示
    const wordDisplay = document.getElementById("displayed-word");
    const currentWord = words_array[showed_cnt];
    wordDisplay.textContent = currentWord;

    // 表示後の処理
    document.getElementById("show-word-container").style.display = "block";
    document.getElementById("show-word-btn").style.display = "none";
    document.getElementById("player-indicator").style.display = "none";
    
    // 次のプレイヤー準備
    showed_cnt++;

    // 次のプレイヤー指示を更新
    if (showed_cnt < playercount) {
        const nextPlayerIndicator = document.getElementById("player-indicator");
        nextPlayerIndicator.textContent = `${showed_cnt + 1}人目の方はボタンを押してください`;
        nextPlayerIndicator.style.display = "block";
    }

    //デバッグ
    console.log(`表示された単語: ${currentWord}`);
    console.log("Showwordsが実行されました");
    playerIndicator.style.display = "none";
}

//画面遷移
function Firstgotowordspage(){
    document.getElementById("first-words-page").style.display = "none";
    document.getElementById("words-page").style.display = "block";
    console.log("Firstgotowordspageが実行されました");
}

function Gotowordspage() {
    document.getElementById("show-word-container").style.display = "none";
    document.getElementById("show-word-btn").style.display = "block";
    document.getElementById("player-indicator").style.display = "block";
    console.log("Gotowordspageが実行されました");

     // 最後のプレイヤーなら次のページへ
    if (showed_cnt >= playercount) {
        Gotolastpage();
    } else {
        // 次のプレイヤーのインディケータを更新
        const playerIndicator = document.getElementById("player-indicator");
        playerIndicator.textContent = `${showed_cnt + 1}人目の方はボタンを押してください`;
        playerIndicator.style.display = "block";
    }
}

function Gotolastpage(){
    document.getElementById("words-page").style.display = "none";
    document.getElementById("last-words-page").style.display = "block";
    console.log("Gotolastpageが実行されました");
}

function Gotonumberpage() {
    document.getElementById("last-words-page").style.display = "none";
    document.getElementById("number-page").style.display = "block";

    // wolfwordとvillagerwordを動的に表示
    document.getElementById("wolf-word").innerHTML = "狼の単語は「" + wolfword + "」でした";
    document.getElementById("villager-word").innerHTML = "市民の単語は「" + villagerword + "」でした";


    // 狼の人が何番目かを探して表示
    const wolfIndex = words_array.indexOf(wolfword); 
    if (wolfIndex !== -1) {
        document.getElementById("wolf-position").innerHTML = `狼の人は 「<b>${wolfIndex + 1}</b>」番目のプレイヤーでした`;
    } else {
        document.getElementById("wolf-position").innerHTML = "狼の人は見つかりませんでした";
    }

    // デバッグログ
    console.log(`狼の単語位置: ${wolfIndex + 1} 番目`);
}

function Gotoanspage() {
    document.getElementById("number-page").style.display = "none";
    document.getElementById("ans-page").style.display = "block";
}