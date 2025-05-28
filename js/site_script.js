//画像のデータ(CSV)
const csvData = `
01,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
02,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
03,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
04,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
05,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
06,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
07,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
08,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
09,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg
10,0001_wear_middle-angle_full-body_face_front_un-smile_looking.jpg,0007_wear_middle-angle_full-body_face_right_un-smile.jpg,0012_wear_middle-angle_full-body_face_left_un-smile.jpg,0010_wear_middle-angle_full-body_face_back.jpg

`;

// グローバル変数
let images = [];
let currentIndex = 0;

//画像情報の取得
const mainImage = document.getElementById('mainImage');

// ボタン要素の取得
const backButtonElement = document.getElementById('backButton'); //左へ進むボタン
const forwardButtonElement = document.getElementById('forwardButton'); //右へ進むボタン
const evaluationButtonElement = document.getElementById('evaluationButton'); //評価へ進むボタン

// 現在のHTMLファイル名を取得
function getFileName() {
    const path = window.location.pathname;
    return path.split('/').pop().split('.')[0]; // "1.html" -> "1"
}

// CSVデータをパースして、該当する行の画像を取得
function loadImages() {
    const csvDataRows = csvData.trim().split('\n').map(row => row.split(',')); // CSVを2次元配列に変換
    const currentFileName = getFileName(); //現在のHTMLファイル名を取得

    // HTMLファイル名に対応する行を検索
    const row = csvDataRows.find(row => row[0] === currentFileName);
    if (row) {
        // 該当行から画像パスを取得
        images = row.slice(1).map(filename => `../images/${filename}`); //1列目はラベルのため削除し、画像のパスを取得する
        showImage(currentIndex); //画像を表示
    } else {
        console.error(`該当する行が見つかりません: ${currentFileName}`);
    }
}

// 画像を表示
function showImage(index) {
    mainImage.src = images[index]; //src属性の指定
    updateButtons(); //前後へ移動するボタンの状態を更新
}

// ボタンの状態の管理を行う
function updateButtons() {
    backButton.style.visibility = currentIndex === 0 ? 'hidden' : 'visible'; //左へ進むボタンの状態管理(非表示/表示)
    forwardButton.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible'; //右へ進むボタンの状態管理(非表示/表示)
    evaluationButton.style.display = currentIndex === images.length - 1 ? 'flex' : 'none'; //評価へ進むボタンの状態管理(表示/非表示)
}

// 右の画像を表示(cssから呼び出し)
function nextImage() {
    if (currentIndex < images.length - 1) { // 最後の画像でなければ
        currentIndex++;
        showImage(currentIndex);
    }
}

// 左の画像を表示(cssから呼び出し)
function prevImage() {
    if (currentIndex != 0) { // 最初の画像でなければ
        currentIndex--;
        showImage(currentIndex);
    }
}

// 初期化処理
loadImages();

// 現在のページ名を取得
const currentPage = document.location.pathname.split('/').pop();

// ページ名に基づいて遷移先を決定
const targetPage = currentPage.replace('.html', '_evaluate.html');

// ../page_evaluate/ディレクトリを追加
const targetUrl = '../page_evaluate/' + targetPage;

// 対応するページを開く
function openEvaluatePage() {
    window.location.href = targetUrl; // 例: ../page_evaluate/evaluate_1.htmlに遷移
}

// イベントリスナーを設定する関数
function setupEventListeners() {
    backButtonElement.addEventListener('click', prevImage);
    forwardButtonElement.addEventListener('click', nextImage);
    evaluationButtonElement.addEventListener('click', openEvaluatePage);
}

document.addEventListener('DOMContentLoaded', () => { //HTMLの全ての要素の読み込み完了後
    loadImages(); //画像の読み込み
    setupEventListeners(); //イベントリスナーの設定
});
