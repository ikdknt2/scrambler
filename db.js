let db;

const request = indexedDB.open("bldDB",1);

request.onupgradeneeded = function(e){
    db = e.target.result;
    db.createObjectStore("times",{keyPath:"id",autoIncrement:true});
};

request.onsuccess = function(e){
    db = e.target.result;
    loadTimes();
};

function saveTime(){

    const time = parseFloat(document.getElementById("timeInput").value);
    const solved = parseInt(document.getElementById("solvedInput").value);
    const attempted = parseInt(document.getElementById("attemptedInput").value);

    const tx = db.transaction("times","readwrite");
    const store = tx.objectStore("times");

    store.add({
        time:time,
        solved:solved,
        attempted:attempted
    });

    tx.oncomplete = function(){

        loadTimes();

        // 入力欄クリア
        document.getElementById("timeInput").value = "";
        document.getElementById("solvedInput").value = "";
        document.getElementById("attemptedInput").value = "";

    };
}

function loadTimes(){

    const tx = db.transaction("times","readonly");
    const store = tx.objectStore("times");

    const req = store.getAll();

    req.onsuccess = function(){

        const data = req.result;

        let out="";

        for(let i=data.length-1;i>=0;i--){

            out += `
            <div>
            ${data[i].solved} / ${data[i].attempted}
            [${data[i].time}]
            <button onclick="deleteTime(${data[i].id})">❌</button>
            </div>
            `;
        }

        document.getElementById("timeList").innerHTML = out;
    };
}

function deleteTime(id){

    if(!confirm("この結果を削除しますか？")){
        return;
    }

    const tx = db.transaction("times","readwrite");
    const store = tx.objectStore("times");

    store.delete(id);

    tx.oncomplete = loadTimes;
}

window.saveTime = saveTime;
window.deleteTime = deleteTime;
