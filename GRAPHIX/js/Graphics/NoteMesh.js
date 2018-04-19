class VisualNote
{
    constructor()
    {
        let y = 0.125;
        this._yoffset = y / 2;
        let z = 0.25;
        this.zoffset = z / 2;
        this._geometry = new THREE.BoxGeometry( 1, y, z );

        this._material = new THREE.MeshLambertMaterial( {color: ColorEnum.NoteColor} );
        this.mesh = new THREE.Mesh( this._geometry, this._material );
        this.mesh.translateY(this._yoffset);

        this.object = new THREE.Group();
        this.object.add(this.mesh);

        this.isValid = true;
    }
}