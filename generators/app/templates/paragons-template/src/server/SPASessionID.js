import * as React from "react"

/*

This component slips in a small piece of JS that retrieves the SPA_SESSION_ID from the cookie and tacks it into the
window.

The value for JS was created by feeding the code below into https://skalman.github.io/UglifyJS-online/

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var SPA_SESSION_ID = getCookie('SPA_SESSION_ID')
    window.SPA_SESSION_ID = SPA_SESSION_ID

 */
const JS = 'function getCookie(S){for(var e=S+"=",n=decodeURIComponent(document.cookie).split(";"),o=0;o<n.length;o++){for(var t=n[o];" "==t.charAt(0);)t=t.substring(1);if(0==t.indexOf(e))return t.substring(e.length,t.length)}return""}var SPA_SESSION_ID=getCookie("SPA_SESSION_ID");window.SPA_SESSION_ID=SPA_SESSION_ID;'

/**
 * @memberof Server
 */
class SPASessionID extends React.Component {

    render() {
        return <script dangerouslySetInnerHTML={{__html: JS}}/>
    }


}

export default SPASessionID