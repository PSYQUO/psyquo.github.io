class VisualNote
{

    /**
     * 
     * @param {Number} length 
     */
    constructor(length)
    {
        let y = 0.125;
        this._yoffset = y / 2;
        this.zoffset = length / 2;

        this._geometry = new THREE.BoxGeometry( 1, y, length );

        this._material = new THREE.MeshLambertMaterial( {color: ColorEnum.NoteColor} );
        this.mesh = new THREE.Mesh( this._geometry, this._material );
        this.mesh.translateY(this._yoffset);

        this.isValid = true;
    }
}