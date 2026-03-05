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

    const tx = db.transaction("times","readwrite");
    const store = tx.objectStore("times");

    store.add({time:time});

    tx.oncomplete = loadTimes;
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
            ${data[i].time}
            <button onclick="deleteTime(${data[i].id})">❌</button>
            </div>
            `;
        }

        document.getElementById("timeList").innerHTML = out;
    };
}

function deleteTime(id){

    if(!confirm("このタイムを削除しますか？")){
        return;
    }

    const tx = db.transaction("times","readwrite");
    const store = tx.objectStore("times");

    store.delete(id);

    tx.oncomplete = loadTimes;
}

window.saveTime = saveTime;
window.deleteTime = deleteTime;
