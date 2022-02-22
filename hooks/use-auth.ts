import useSWR from "swr";
import {PublicConfiguration} from "swr/dist/types";
import {LoginPayload} from "@/models/auth";
import authAPI from "@/api-client/auth-api";

const ONE_HOUR_TO_MINI_SECONDS = 60 * 60 * 100;

export const useAuth = (options?: Partial<PublicConfiguration>) => {
  const { data: profile, error, mutate } = useSWR('/current-user', {
    dedupingInterval: ONE_HOUR_TO_MINI_SECONDS,
    revalidateOnFocus: false, // tự động call khi mở khởi tạo page
    ...options,
  })

  const firstLoading = profile === undefined && error === undefined

  const login = async (param: LoginPayload) => {
    await authAPI.login(param)

    mutate()
  }

  const logout = async () => {
    await authAPI.logout()

    mutate({}, false)
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading
  }
}