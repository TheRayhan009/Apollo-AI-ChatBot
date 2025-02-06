function test(){
    console.log("hello");

    let data = $("#userprompt").val();
    if(data !== ""){
        console.log(data);

        document.getElementById("chatBox").insertAdjacentHTML("beforeend", `
            <div class="flex items-start justify-end">
                <div class="bg-blue-500 text-white p-4 rounded-lg">
                    <p>${data}</p>
                </div>
                <img alt="User avatar image" class="w-10 h-10 rounded-full ml-4" 
                    height="50" 
                    src="https://storage.googleapis.com/a1aa/image/1_LnEf5K6WfBVU73C8tjcyrMz01_wlqmtQ0k-t2wvtQ.jpg" 
                    width="50"/>
            </div>
        `);
        
        
        document.getElementById("think").insertAdjacentHTML("beforeend", `
            <img alt="Bot avatar image" class="w-10 h-10 rounded-full mr-4" height="50" src="https://storage.googleapis.com/a1aa/image/0LS9r2t2Iw_S4qExkh4IajU6z25uVyr3ciFQsgbjs1Y.jpg" width="50"/>
        <div class="bg-gray-200 p-4 rounded-lg flex items-center">
         <div class="thinking w-2 h-2 bg-gray-500 rounded-full mr-1">
         </div>
         <div class="thinking w-2 h-2 bg-gray-500 rounded-full mr-1">
         </div>
         <div class="thinking w-2 h-2 bg-gray-500 rounded-full">
         </div>
        </div>
        `);

        $.ajax({
            method:"GET",
            url:"/getbotreply/",
            data:{
                "prompt":data
            }
        }).done(function(response){
            let data=JSON.parse(response)
            console.log("done");
            console.log(data.reply);
            
            document.getElementById("chatBox").insertAdjacentHTML("beforeend", `
                <div class="flex items-start" id="bot">
                    <img alt="Bot avatar image" class="w-10 h-10 rounded-full mr-4" height="50" 
                         src="https://storage.googleapis.com/a1aa/image/0LS9r2t2Iw_S4qExkh4IajU6z25uVyr3ciFQsgbjs1Y.jpg" width="50"/>
                    <div class="bg-gray-200 p-4 rounded-lg" style="max-width: 800px; overflow-x: auto;">
                        <pre style="max-width: 800px; class="bg-gray-100 p-2 rounded-lg overflow-x-auto"><code class="language-python">${data.reply}</code></pre>
                    </div>
                </div>
            `);
            document.getElementById("think").innerHTML = "";
            
            
            scrollToBottom()


        })
        
        $("#userprompt").val("");
    }

}

function newTab(){
    location.reload();
}

function scrollToBottom() {
    $("#chatBox").stop().animate({ scrollTop: $("#chatBox")[0].scrollHeight }, 500);

}

