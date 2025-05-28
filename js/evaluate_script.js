//ラジオボタンのグループ名を定義
const radioGroups = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7'];

//評価送信時の処理
function dispText() {
    //各ラジオボタングループの評価値を取得して新しい配列を作成
    const selectedValues = radioGroups.map(name => {
        return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
    });

    //現在のHTMLファイル名を取得
    const currentFileName = document.location.pathname.split('/').pop().replace('.html', '');

    //提示刺激の番号と評価をまとめる
    const text = `${currentFileName},${selectedValues.join(',')}\n`;

    //Blob(バイナリデータを扱うためのオブジェクト)を生成
    const blob = new Blob([text], { "type": "text/csv" }); //csvファイル形式を指定

    //ファイル名を提示刺激番号に設定
    const outputFileName = `${currentFileName}.csv`;

    //評価結果ダウンロードリンクの設定
    const link = document.getElementById("createfile");
    link.href = URL.createObjectURL(blob);
    link.download = outputFileName; // ダウンロードファイル名を提示刺激番号に指定

    //少し遅らせて次のページに遷移（ダウンロード完了後に遷移）
    setTimeout(() => {
        window.location.href = "../index.html"; //一番初めのページに遷移
    }, 500); // 0.5秒遅延

    // CSVを出力した後、sessionStorage(入力状態)をリセット
    sessionStorage.clear();
}

// ボタン表示/非表示を更新する関数
function updateButtonVisibility() {
    const allSelected = radioGroups.every(name => {
        return document.querySelector(`input[name="${name}"]:checked`) !== null; //評価済みか確認
    });

    const submitButton = document.getElementById('createfile'); //評価送信ボタンの情報を取得
    if (allSelected) { //評価項目を全て記入済みの場合
        submitButton.classList.remove('hidden'); //hiddenクラスを削除し評価送信ボタンを表示
    } else { //評価項目に未入力がある場合
        submitButton.classList.add('hidden'); //hiddenクラスを追加し評価送信ボタンを隠す
    }
}

// ラジオボタンにイベントリスナーを追加
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', updateButtonVisibility); //ラジオボタンが変更されたときに表示・非表示を管理
    radio.addEventListener('change', saveSelections); //ラジオボタンが変更されたときに選択内容を保存
});

// ページ読み込み時に初期状態を設定
document.addEventListener('DOMContentLoaded', () => {
    updateButtonVisibility(); //ページ読み込み時に表示・非表示を管理
    loadSelections(); //ページ読み込み時に選択内容を復元
});

// sessionStorageにラジオボタンの選択内容を保存(ページを移動しても入力状況を一時的に保存)
function saveSelections() {
    radioGroups.forEach(name => {
        const value = document.querySelector(`input[name="${name}"]:checked`)?.value || ""; //ラジオボタンごとに選択値を取得、未選択の場合は""となる
        sessionStorage.setItem(name, value); //sessionStorageに保存(キーと値の組)
    });
}

//ページ読み込み時にsessionStorageからラジオボタンの選択内容を読み込み
function loadSelections() {
    radioGroups.forEach(name => {
        const value = sessionStorage.getItem(name); //キーを用い、ラジオボタンごとに保存された値を取得
        if (value) {
            document.querySelector(`input[name="${name}"][value="${value}"]`).checked = true; //取得した選択内容をラジオボタンに反映
        }
    });
}

//戻るボタンを押した時の処理
//現在のHTML名を取得
const currentPage = document.location.pathname.split('/').pop(); // 例: "01_evaluate.html"

//HTML名から"_evaluate"部分を削除
const originalPage = currentPage.replace('_evaluate', ''); // 例: "01.html"

// ../page_site/ディレクトリを追加
const targetUrl = '../page_site/' + originalPage; // 例: "../page_site/01.html"

//戻るボタンを押した時に元のページを開く
function openOriginalPage() {
    window.location.href = targetUrl;
}