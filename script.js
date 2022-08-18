canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let wid = canvas.width;
let hei = canvas.height;
let htCone = 190
let rdCone = 120
let widby2 = canvas.width / 2;
let heiby2 = canvas.height / 2;
ctx.fillStyle = "rgb(124,175,241)"
ctx.fillRect(0, 0, canvas.width, canvas.height);
let started = true;
let start=document.querySelector("#start")
let stop=document.querySelector("#stop")
start.addEventListener("click",function rdy(){
    drawCone();
    animate()
    start.removeEventListener("click",rdy)

})
stop.addEventListener("click",function stp(){
    window.location.reload()
    stop.removeEventListener("click",stp)
})


let stack = 0

function drawMachine() {
    ctx.beginPath();
    ctx.lineWidth = "3"
    ctx.fillStyle = "rgb(62,253,220)"
    ctx.roundRect(widby2 - 250, 0, 500, 70, 12)


    // ctx.fillStyle = "white"
    ctx.roundRect(widby2 - 80, 72.5, 160, 30, 8);
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = "rgb(62,253,220)"
    ctx.roundRect(widby2 - 17, 100, 34, 40, 2);
    ctx.strokeStyle = "black"
    ctx.stroke()
    ctx.fill()
}


function drawCone() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(234,206,158)"
    ctx.moveTo(widby2, hei - 10);
    ctx.lineTo(widby2 - rdCone, hei - htCone)
    ctx.lineTo(widby2 + rdCone, hei - htCone)

    ctx.fill();

}
function drawTable() {
    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.fillRect(widby2 - 300, hei - 10, 600, 10)
    ctx.fill();
}
drawMachine();
drawTable();
// drawCone();

class Cone {
    constructor(radius, height) {
        this.radius - rdCone;
        this.height = htCone;
    }


}
class Cream {
    constructor(left_x, left_y) {
        this.default_left_x=widby2 - rdCone
        this.default_left_y=hei - 200
        this.default_width=2 * rdCone
        this.left_x = widby2 - rdCone
        this.left_y = hei - 200
        this.width = 2 * rdCone
        this.ht = 25
        this.flowrate = 2
        this.start_y = 140
        this.spread_start = widby2
        
        this.spread_rate = 1


    }
    update() {
        this.default_width -= 40
        this.default_left_x += 20
        this.default_left_y -= 20
    }
    updateflow() {
        this.start_y += this.flowrate
    }
    updatespread() {
        this.spread_start -= this.spread_rate
    }
    flowcream() {
        if ((this.start_y + 10) == this.left_y) {
            if(stack==6){
                
                return
            }
            this.spread()
            

        }
        else {
            ctx.beginPath();
            // ctx.lineWidth="25";
            ctx.strokeStyle = "rgb(234,225,224)";
            ctx.fillStyle = "rgb(234,225,224)"

            ctx.moveTo(widby2, this.start_y);
            ctx.roundRect(widby2, this.start_y, 10, 15, 10)
            ctx.stroke()
            ctx.fill()

            this.updateflow()
        }
    }
    spread() {
        if (stack == 6) {
            ctx.beginPath();
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            ctx.fillStyle = "cyan"
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fill()
            
            return 
        }
        if (this.spread_start == this.left_x) {
            this.left_x += 20
            this.spread_start = widby2
            stack += 1

        }
        else {
            ctx.beginPath()
            ctx.roundRect(this.spread_start, this.left_y - (20 * stack), 2 * (widby2 - this.spread_start), 25, 20)
            ctx.strokeStyle = "rgb(206,197,189)"
            ctx.lineWidth = "3.5"
            ctx.stroke()
            ctx.fillStyle = "rgb(234,225,224)"

            ctx.fill()
        }




        ctx.closePath()
        this.updatespread()
    }
}

let cream = new Cream()
function animate() {
    
    cream.flowcream();
    

    window.requestAnimationFrame(animate)
}



function drawfinal() {
    drawCone()
    drawTable()
    drawMachine()
    drawCream()
    
    
}