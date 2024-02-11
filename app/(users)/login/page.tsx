import { type FC, type ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Login: FC<Props> = () => {
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
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
              登录
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              片刻后生成 平衡 忠诚 不息的身体
            </p>
          </div>
          {/* <ValidateProvider ref="validateRef"> */}
          <form className="mt-8 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  用户名
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
                  placeholder="用户名"
                ></input>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  placeholder="密码"
                ></input>
              </div>
            </div>

            <div className="flex flex-row-reverse items-center justify-between">
              <div className="text-sm">
                <a
                  className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {' '}
                  忘记密码？{' '}
                </a>
              </div>
            </div>

            <div>
              <button className="relative flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md group hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                登录
              </button>
            </div>
          </form>
          {/* </ValidateProvider> */}
        </div>
      </div>
    </div>
  )
}

export default Login
