/**
 * Created by alex on 22.03.15.
 */
String.prototype.trunc =
    function(n,useWordBoundary){
        var toLong = this.toString().length>n,
            s_ = toLong ? this.toString().substr(0,n-1) : this.toString();
        s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
        s_ = s_.replace(/\n{3,}/g, '\n\n');
        return  toLong ? s_ + '...' : s_;
    };