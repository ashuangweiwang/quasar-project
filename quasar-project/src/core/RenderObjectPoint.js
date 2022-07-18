import * as THREE from '../three.module.js';
class RenderObjectPoint extends THREE.Points {
    constructor(oGeometry,visualStyle) {
        super();
        this.label = 'Point'
        this.ClassName = 'RenderObjectPoint';

        this.positions=oGeometry.points;
        this.tinindex=oGeometry.trianglesindex;
        this.style = visualStyle;
        this.material;
        this.points;
        this.geometry = new THREE.BufferGeometry();

     /*    this.label = 'Points'
        this.ClassName = 'RenderObjectPoint';
        this.positions = oGeometry.points;

        this.pointMaterial = new THREE.PointsMaterial({
            color: visualStyle.Color,    //设置颜色，默认 0xFFFFFF
            size: visualStyle.Size        //定义粒子的大小。默认为1.0
          
        });
       
        //生成点模型
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
        //this.geometry.computeBoundingSphere();
        this.points = new THREE.Points(this.geometry, this.pointMaterial);
        console.log(this.points); */
       
    }
    drawPoint(){
        this.material = new THREE.PointsMaterial({
            color: this.style.Color,    //设置颜色，默认 0xFFFFFF
            size: this.style.Size        //定义粒子的大小。默认为1.0
          
        });
       
        //生成点模型
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
        //this.geometry.computeBoundingSphere();
        this.points = new THREE.Points(this.geometry, this.pointMaterial);
        return this.points;

    }
    ShowRenderObj(){
        this.points.material.visible =true;
        
    }
    HideRenderObj(){
        this.points.material.visible =false;
        this.points.visible=false;
       
    } 
    Clear() {
        super.Clear();
    }
    drawPoints() {


    }
}
export { RenderObjectPoint }