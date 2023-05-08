import axios from 'axios'
import {
    ElLoading
} from 'element-plus'



//export将service传出去
export const service = axios.create({
    baseURL: 'http://localhost:8080/'
    //baseURL: import.meta.env.VITE_BASE_URL, //这里也可以使用变量
    //timeout: 30000,//超时设置
    //withCredentials: true, //异步请求携带cookie
    //headers: {
    // 		//设置后端需要的传参类型
    // 		'Content-Type': 'application/json;charset=UTF-8;',
    // 		//'token': 'your token',
    // 		'X-Requested-With': 'XMLHttpRequest'
    // 	}
})


//下面有2种写法，一种是声明函数的写法，一种是箭头函数的写法，都可以

//request interceptor  请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        console.log(config)
        console.log('这里是请求前')
        //这里是使用了element-plus，进行模态化窗体，也就是等待查询的意思，本案例在api中，设置了等待时间
        // ElLoading.service({
        //     lock: true,
        //     text: 'Loading...',
        //     background: 'rgba(0, 0, 0, 0.7)', //灰色，删除就是白色的
        // })

        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error)
        console.log('这里是请求错误')

        return Promise.reject(error)
    }
)


//响应拦截器
service.interceptors.response.use(
    res => {
        // 在请求成功后的数据处理
        if (res.status === 200) {
            console.log(res.status)
            console.log('这里是请求成功后')
            //查询成功，关闭模态化窗体
            ElLoading.service().close()

            return res;
        } else {
            console.log(res.status)
            console.log('这里是请求失败后')
            ElLoading.service().close()

            return res;
        }

    },
    err => {
        // 在响应错误的时候的逻辑处理
        console.log('这里是响应错误')

        return Promise.reject(err)
    });