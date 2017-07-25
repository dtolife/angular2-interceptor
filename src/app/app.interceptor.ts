import { Injectable }    from '@angular/core';
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';

@Injectable()
export class ServerURLInterceptor implements Interceptor {
    private flk_key ='0123456789ABCDEF';

    private enc_obj_arr = [
    {
        url:'https://demo.flksec.com:2017/1/secrets',
        param:'a',
    },
    {
        url:'https://demo.flksec.com:2017/1/secrets',
        param:'m',
    },
    ];

    private dec_obj_arr = [
    {
        url:'http://localhost:3030/message/get_msg',
        param:'content',
    }
    ];

    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        var self = this;
        console.log(request);
        this.enc_obj_arr.forEach(function(item){
            if(request.url.indexOf(item.url)>-1){
                // 修改请求
                if(request.options.body){
                    let body = JSON.parse(request.options.body);
                    body[item.param] = flkEnc.sym_encrypt(self.flk_key,body[item.param]);
                    request.options.body = JSON.stringify(body);
                }
                else{
                    let get_url = request.options.url;
                    let url0 = get_url.split('?')[0];
                    let param_arr = get_url.split('?')[1].split('&');
                    var search = '?';
                    let len = param_arr.length;
                    param_arr.forEach(function(i_item, index) {
                        let body = i_item.split('=')[0];
                        let val = i_item.split('=')[1];
                        if(body == item.param){
                            val = flkEnc.sym_encrypt(self.flk_key,val);
                        }
                        if(index<len-1){
                            search += body + '=' +val + '&';
                        }
                        else{
                            search += body + '=' +val ;
                        }
                    });
                    url0 += search;
                    request.options.url = url0;
                }
            }
        })

        return request; 
    }
    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        let param;
        let dec_flag = 0;
        let json = response.response.json();
        let results = json.results;
        var self = this;
        this.dec_obj_arr.forEach(function(item){
            if(response.response.url.indexOf(item.url)>-1){
                param = item.param;
                dec_flag = 1;
            }
        }); 
        if(dec_flag){
            results.forEach(function(item){
                item[param] = flkEnc.sym_decrypt(self.flk_key, item[param]);
            });
            json.results = results;
            response.response['_body'] = JSON.stringify(json);
        }
        console.log(response);
        // let json = response.response.json();
        // let results = json.results;
        // for(let item of results) {
            //     item['title'] = flkEnc.sym_encrypt(this.flk_key,item['title']);
            // }
            // json.results = results;
            // response.response['_body'] = JSON.stringify(json);
            return response;
        }

    }
