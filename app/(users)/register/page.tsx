'use client'
import {
  useState,
  type FC,
  type ReactNode,
  type MouseEvent as IMouseEvent,
} from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { register as registerApi } from '@/apis'
import { useUserStore } from '../userStore'

type Props = {
  children?: ReactNode
}

const Register: FC<Props> = () => {
  const router = useRouter()

  const setStoreUsername = useUserStore((store) => store.setUsername)
  const setStoreToken = useUserStore((store) => store.setToken)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  function validate(reg: RegExp, value: string) {
    return reg.test(value)
  }

  async function register(e: IMouseEvent) {
    e.preventDefault()
    if (!username || !password || !passwordConfirm) {
      return toast.error('请填写完整信息')
    } else if (!validate(/^[a-zA-Z0-9_-]{4,16}$/, username)) {
      return toast.error('用户名格式错误')
    } else if (!validate(/^[a-zA-Z0-9_-]{6,18}$/, password)) {
      return toast.error('密码格式错误')
    } else if (password !== passwordConfirm) {
      return toast.error('两次输入的密码不一致')
    }
    const { code, msg, data } = await registerApi(username, password)
    if (code === 200) {
      setStoreUsername(data.username)
      setStoreToken(data.token)
      toast.success('注册成功')
      const originPath = localStorage.getItem('originPath')
      router.replace(originPath || '/')
      localStorage.removeItem('originPath')
    } else {
      return toast.error(msg)
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="w-auto h-12 mx-auto"
              src="/img/tailwindcss.svg"
              alt="Your Company"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-l-gray-600-d-gray-200">
              注册
            </h2>
            <p className="mt-2 text-sm text-center text-l-gray-400-d-gray-400">
              自然赠与你 树冠 微风 肩头的暴雨
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  用户名
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onInput={(e) =>
                    setUsername((e.target as HTMLInputElement).value)
                  }
                  className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6 outline-none dark:bg-slate-700 dark:text-slate-300"
                  placeholder="用户名"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onInput={(e) =>
                    setPassword((e.target as HTMLInputElement).value)
                  }
                  className="relative block w-full border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none dark:bg-slate-700 dark:text-slate-300"
                  placeholder="密码"
                />
              </div>
              <div>
                <label htmlFor="password-again" className="sr-only">
                  Password
                </label>
                <input
                  id="password-again"
                  name="password-again"
                  type="password"
                  value={passwordConfirm}
                  onInput={(e) =>
                    setPasswordConfirm((e.target as HTMLInputElement).value)
                  }
                  className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none dark:bg-slate-700 dark:text-slate-300"
                  placeholder="再次输入密码"
                />
              </div>
            </div>
            <div>
              <button
                className="relative flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md group hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={register}
              >
                注册
              </button>
            </div>
          </form>
          {/* </ValidateProvider> */}
        </div>
      </div>
    </div>
  )
}

export default Register
