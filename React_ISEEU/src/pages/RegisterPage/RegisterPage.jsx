import React, {useState} from 'react';
import "./RegisterPage.css";
import { OR,MBut,DEL,Search,UserText1,UserText2,UserAge,CheckBox,OpenLi,EmerBtn,Btn,LiBTN } from '../../components';
import {Form} from "react-router-dom";


const Register = () => {

    const [formData, setFormData] = useState({
        NID: '',
        username: '',
        password: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json());
    };

    return (<div id ="container" >
        <img id={"logoPic"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf8AAABiCAMAAABpoCqlAAAAilBMVEX///8Yd/IAbvEAcfIAcPEAbPENdPIaefJWlPWvyPnP3/wAavHI2vva5/ymw/mCrPfW4/ygvvju9P71+f4tf/P5/P/B1fvl7v270fq2zvqWufiHr/fG2fvs8/6hwPiQtfdEivRhmfVrn/VQkPQvgfPh6/13pvZonfVSkfRFi/Ryo/YAY/ExgfMAZvHvGYJwAAASGElEQVR4nO1d23biOgwtSWwILgTKrUC5lsLQmfn/3zvhksSxtmyH0tN2VvZT1yJRbW1bVmRZfniwYNSLV9vWbthsNJvD3XGzTWbxi+2FH4dF5/G5O0s2s69uyP0wSvs0Xa72renH5LzN1kpEoZSNK2SKMGjep5VfiUXvZdqfb193gRIiCMJQBslXt+mjmPTG8Sw5vDZF1icRf0TeeK3CnHkdw3u1+OtwVGcFad0Lfzz/gQiicp+iD/DfWQtI/r/Bf4v07efz3yREfYD/meLYr/n/prgn/1vBsl/z/01xR/63gYX+mv/vifvxP7PN/pr/b4q78d9RVvpr/r8n7sb/jnf9av6/L+7F/9hu/Wv+vynuxf/aMf1r/r8n7sT/m2P1r/n/prgT/7Ow5v9H4k78M+ZfhtEV/8L+T80/hxE0/0F4WHXjuHvB/dv+f6Pmn0MPef/RBzeSvx1q/jnEEZj9k/u39mtR889hRd2/6B8w+AZq/jlsqfsXjO7f2C9GzT+HX0Qz8tf92/rVqPnnQD//wvn92/rVqPnnMCRSwv792/rVqPmvIOXfc/9q/qtIqfn/Eaj590fNfwUpNf8/AjX//qj5ryCl5v9HoObfHzX/FaTU/P8I1Pz7o+a/ghQ//kedcXe2Ws26z50P7xcNOo/Tbn+2ms2W8Uvvye+l0aQ9jrvL/rI7fewM7M86+T93ZtaPX27qTNqUS/v73Wl7crM6Fr1x3J+l6KbtcPToA/x3NLxRKeHqrVMCyAZoz3fifPw4DKNABMd+8cyg1zHQs3XlaTx/lafz62dhYZSKE+E6mdpTEDrd7S44v3XOUEv/bLRmbf55K/9P3ddA68x6ZRFE8Ra/p03J25+2JRi+x29VRKQYjOfH8KTSKJMiGhtbj3z5fzLZ6DwIHURIqprSA+KvuR/0tJKiXClARqrVu/7a/i0M/GYLiExmf0QAig7IMFDDVYd562Ufikiab8lQhHtOYRb+OxsVSUNQY+Vpg95WQ9QUGYnmnGs+xSA+IjWkDYm2Y/YtP/7/KJOOB0C5DYbUUaJQxrBUh8s0pwllwSPuwDNXcOLae7UGnR/MJFuooCHFDmeusfyPtvDge6gSDys+PkJVZCJQ8wHe3kVg6ZGcMS3x4n9JT/ZW5T8odWMacF0Ow/Ps8+V/OuR5vEKK9cJ4ayXs6erpCEA2gOP/MWR748yBfPnj6IAUQ3fppMXBUnnhjCjApYp8+H8C9r0q/6KnCdzaTov8PanMj//J2nXq7AxVdh3GEmQrGpAKePYM/11bb9TWxtug5eLt3JaWw42z1d3IETXRDPLhn/a7Ov+qmIOjtV3/pwHgxf/Sp9up/lqlt6yDr0D0hygd87+0y4vWPG9j3mSXexDYFoGntbXwQgE0pj34fwaTTFa2/8X688fV6b89L/43XpPf6NBg5zypdIWU5rIB+R+7hpNkTz6t/EbiCWrF0t/zHEQpgjXxAtz8j4D4YFmV/0Yuz3lS9DS6PPhf+xKpNDd80fBWVjoADP8d8D8fuAehXGPi9p7j9wyxZ+h/8R9Ep7FoGjU3/3uq59OQrvBfT2/sMnHv7sW3Ee7fnPx706+rf1CBfjpzAf+rjc/KC32AvafVviLAA+CxCv1pl5qGBXDy3wP/QHUq87+5inv2aq+gB0oM/lu+9DeiZfGWq0iFgXBT/p/0bT+BCnwFOMrlUAjkwLvPXRswjZGT/yHt4dnrrfZvs0DJyJM2mlBa5n/lP3lUEQR89x40V4gSccgP9kNAfMmK8/YERb8DR5Xs2RnReyX+Z0jRD9X5vw5esJh4osQ/MkoMipWHddVO9WlJ+O2CUDeXt/MflpWeLkS36CEko2hzgxj1XIH/CbL+j9X5vwpF4jxR4h8YJQ5h4TnDl2Qgdod9st80BfBMQt3vvp3/hjJC+Yeb+D8Y9Du/PbAYfRg5+D8C639pRbX/GVxsFz/95WnHwqZfnf8ua/1TMUFw2kbJRYk8gj5Dnqd4HWfqWHSb9AmhKcvKv70DskxdmyPuLIUVo4yoJCXvKsXamHBvFaHzHwMnJRrdwP+FBe5jKRTD7Xw2S1qWqLzOP/NQOpXXST9+fp5254ehuMSY87oTIzBoZKPsVdIv8kg7x8Lzf+rAqt+fb4dcZFmVviXxN7AMwl/JrD9LXiP8TW84byAsf26y2L2fGnNoMo3RPCI7/wMwYzKXKNSB2lp64O+5+0v47RfKfh5pabe4maHxH+N+i+NUt2yDl3nKRnEODfxzSWJ8U/LvtbolHP8yWOUanawiqPRQ994f4TwQr4WDNz7iR0rDFTYnbCzzodZJ4HzSDYCVf7BK5ec6+xq6VIrcLvUnLr2HX0tGZOOR8cQ0/uHqH6Lwdm//OzeZwFhKGlcn/q62ccHwH5TD84MDpE6vf4MESVmO8T4j+10KZU/RNDBivBMYJtEWNRv/6BtFwT1tv11k6P0pM1HoqQnVXPAPnf+o9QCRNxeUKBEoqm4OLs0DxPzTOyDgp70qdvIXoAOyaSoWhiq1bRS4iCii9gOwuVpIxMYcmDHB0pTPSQH5X11UJYQGthfQvBf8z8GQDhn6C9C3cFzWnFXa9yPknzjlKRL0JVEsAH3QgcjcbEinC9CDdqwWzaYAnLoFLrzWJwv/c7Bg7qh8RgrgH8RKIQdwfS/4R4bcXV2Orj0B3ps3J6/IJyae/0gG2OKSx/xXMHHFM5ACvG9NX8ifeQVSBkCbhQfI848KOpufsRYpgH9kr2CuFfITcv5hSMKZbAdyGBROiTFHaZB7ZYh/PIjaYAVQ2Y8D2gFtcOgAw6hYf1/BjzDfsU8His3GZ78BEiJuF9KLf0AcszWGPJucf/CjdFr/hxfyFrctZ5ayLEwunP9YCJrimQPwTDsQ4BQf9GRuKIAaNlAK+PAtwhEs/yDGItkajl78j6lELkscTJ+c/4SunoLJDdRA11yuQompdJnHbgH/ITMjQEG03FIA/0UyraZP5q0G/iyXJfKO8neu4PhHOV+8lfXif0l7gw0W1HTOP7B7nPqsOuDGXtvkP7fNoFWCUcmCqi8fKrQD0tweyEDrauVLPBhhipECJl7u1HD8o7HOpSB48g8mLmM9kYec8w/ot+bYXUC94AC5XCk6JnW51UOjkkvwpRuYuc0FtfK4Ixfgiykb61SbjBORzmW68AbZuGX4R+X8Q1a5fvxT9bHrNhixGf+g1KzPWSPaQi6hnKSe5P0GHfjD/T8wc9eXX4D7J7gsf2Dks2TWKofRiJBixGH+Uc6XsuQgevFfoUgYmYMFXRPwk8dRG7CSLtuPAG1iWPPNe8A/9rgeYEH0qx2hqU2lTaYSwMzNxgp1z/lpQFecPBqB+Uc5X2xXsRTamApFwoD3kfGP4njuSrNo8+e8U0hBTK6w8M8uifzybPoXDYtlBc3O9ADWImZBQ8YotxWQfxRhZccoI4XyT2Wy6x7YKMz6/QicGecpRxgE8UX+yV3F5IIVTLG/8P4rYPlqhsEHBntOBPgKmcsE+QcbLPZbgb34B33hTseMeP6Ra+A+ZeWRpsvCxj9b5ZLGG7J4E/io5/mnrbnqDAxozqGBse/MmgPmnvughWurem/ln7NYFv6B+iyOaYb/nX9gpq78o+AW2276aMY/ryEKwH/meYOdW1DMm/1QZ6XU/FM5F/7R7gbbbvrodc38PP7RtqOrmmvNv4l/i3/eteCk1PxTOT+Df4mSih0R1pp/E5+3/n82/9EzOCZhif0yUv5H/z/y8P8/6fuvkv9/+QUM4Fv8v8/z/2MQLHPssH/7738U//HFTfx/3vf/1WZ+5vf/FFhL6/193z7+B9TljZviP3z8DwxgfgHjZznYIbtb/A/c59KIbBd63Dv+D2LkH4z/o48as6YRg988/18Y/6eziY//Uzod8X+wfa0nsBLcuv/HqQ+snrb9P4+KdcD4dDs9L7Qz9wJ0gMmHRPkGn7//x85QS5In8xM4WmLLsfTiH2wqcYsKSBWx7f9z6RMa6BSw1lSBQPv/3LM0hJ7v/4OxzfnBYBWx7P+j7M8TwIjLtckNDZDABlK1H3gplH+Q1KFo1vMZIFM4bzHIZ+b95xx7Ol1wKrsFKP+nhx8FDowt/4f7ugJZBFmSB0gNEYwU9C2SKZ7jHxUW4IPAt+b/BYzltuV/ovw/twNALQq/d8sB5UThqmroIz/va4X8P6b2wgkgxZj7AES7+dlv7NKwAqZnzWnm5vxfbLLASCk6B+Jn1tyEC8AcqHwjPcr/ZVYwkKRoy/9lEljRjMmWChAikeAoygm2ZA7eNQCbwMzpn4/k/0PPB5n4nH9omZxlUlH+f9ULihH/8AwZPjuRN8V7HoBFuFgxgZLwcgoyuQt2eP7RGXVuvfbjH+gPdhwlHzrO/7B5eDnABwDvz2DA/H9oAABxWnYmOFkBhxEovKd9cAB3CtpBVHKnOMdj+TRAywaTYurHPzr+LehzA8f5T5RHHDpTgMFbVa8oxuf/gBuBiuZongKIDaCjyE/2U4TIDqIsHTTriqXPdv4TmTvssPnxD4tV0bRSXFOr4B8drmoErgEAztx7uA0l4PN/gpgRWBBW+1JAJ9hoZb4BOgetr1mojibVJiozp8Vdbfyj8jI4VOV5/wNkVpVd6Demto/m3MKyJ+Ef4ANMVn9ztSOfwn59xyAeltY75vy/MMIPCS5hoT0BvMOGbJQ/JduoDkLJ/sJjsoY2By30UHGk1X5yHx3YhSn7nvyjg88pC8Mi/DFJuJq+Gv+4jIhUm7IX3emvVVgs8ujYeNBiS/Qv4pYK/Oq/hXKZz4pBt4Hrf+hWAjo4DXUoRkB7AwdR2U2AatC1uZjBOjL6eRl7/Rd0dBjtMnjyDzzfc3sC8WvencbL/Y4vha/xP2I2c6SINqvpuN1+mfaTY3C+XqJY6lDVhfSVhJqNUSfeD8/3OZQji3z9n0gdzx1IjoppW9lzxkucFI3tLI7j2baB6yAZ4WZY0KrQZsJpUz/FXb3+Uwi8Jt/7f2g8K2t0GJ2KdrEKLgc3QIJqLueSxF9Uvyo6i6s/hqL53n9ud94mk07vcbqcb4ZK5Hd5lAIztvpflw6wNbcMV4Ot/njVA/OrWQHSrk1OTMlXvqH+G/C0fPmvXK60QCm4xRU+Ayg8Zsb6nAfNdasvMJVf2pn5SP0/w8rcJIqsvWif3o1AX/Mc/MONQJpn4H3/1/Y+9T/Z+nkUWtAS1jK1Qy8e/AH+SWTu6ZZ8lIA4K7e0qPwJ56rchEwtjVZ78397HlY5uJ1UqP9brLwepecNlKbc7fwLwpxfHewSQBXpG8rIGjWtnZW7gKtCQx7+9/8hj4IioGcQjM2No3/976IlKKLiaomNfzn3E4KiJvOqMwF+rFYohHxtsrHr4eQfhrLN/bYK9z/6VL6Vr876/yPnLSKFsA+oq7S1SPgPl3wlWv0xGGc6VKz/j4NVFe0IudPCXbkPlQEzg95V7v/0IE5N6AFwc3PT/yIX/fqnymXX9e92yv/M50YBbnOi0gBg6EcVS21NaZgbOB6VG4GzbRaCqsI/jGuWoLo+97+MXj31V8qu6VmLTFPon9yI/4VzSZFNLruPCRQiKD5Z4cV5A17RXnqnlQf/aM5IpxS+Jodr5orE8/6vuef9X6Wp431bVtaawmAi/lGpivIzJLBfIPbrQEPSsp4aJkNPt0aB/ACfyq3oo80pxVaTpWXT2bmCrd/9f72hF5fG/X9et+UVLxfWA/L/0Ils4oS1NJ3fBYZi7chUYIPmpcaGnpFbwj/aQXZKsdbk6bINlur8xe17/2dXOm8/k8HQWPQWW8uNq8a7QVK8jPm3WRRJqhubmDZcHQikO7258+oaAdxdtF6Vm0EiglOKveNPmAIprrt4/vf/xmzJ/avEIapEnVhuy83eDAPVsu//ZLHFJb7ONlRbjxugY9sVtlI0/a5jb7cs1yDLQCT+mTteOQTl30NhVtH568quBRSEapeZqPZvUyB//3dv3lD0+uxTtyPLZd7TjUKXhl9eTN9Uu/mLMWNeldnJzA0erciNDanO954JZu19IOD95SJ4979FfjEbKrAUnYbxKz+GIsocmLlPynzM6AGFR9/HyU5v6Vq7q31ABdqm0iROjqTnu31sTwts9w80KyxFszWPe8Ba9kixMG0j7SUpydollY4X9LpbsynDw5JJLmexmCZrszO/VuYwLgEwhyzFm/nQfxZOJDLOKHOgAAAAAElFTkSuQmCC"} alt={"Logo"}/>
        <p id={"title"}>New Admin</p>
        <div id={"regForm"} className={"col-7 mx-auto"}>
            <Form data={formData} onChange={handleInputChange} onSubmit={handleSubmit} >
                <p id={"secondTitle"}>Access Info</p>
                <UserText1  label = "National ID" type={"text"} />
                <UserText1 label = "username" type={"text"} />
                <UserText1 label = "pasword" type={"password"} />
                <UserText1 label = "password confirm" type={"password"} />
                <div id={"btnDiv"} className={" offset-9"}>
                <Btn id={"nxtBtn"} label={"Next"} type="submit"/>
                </div>
            </Form>
        </div>
    </div>)
}

export default Register




