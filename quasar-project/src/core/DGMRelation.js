class DGMRelation extends DGMObject {
    constructor() {
        super();
        this.ClassName = 'DGMRelation';
        this.SourceCode;  //
        this.TargetCode;  //featureid
	    this.RelationshipTerm;// (ct,cb)
    }
    Clear() {
        super.Clear();
    }

}