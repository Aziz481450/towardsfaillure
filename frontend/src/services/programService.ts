import api from './api'
import type { ApiResponse } from './authService'

export interface ProgramDto {
  id: string
  userId: string
  name: string
  goal?: string
  description?: string
  weeks: WeekDto[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface WeekDto {
  name: string
  days: DayDto[]
}

export interface DayDto {
  name: string
  exercises: ExerciseDto[]
}

export interface ExerciseDto {
  exerciseId: string
  exerciseName: string
  sets: number
  reps: number
  restSeconds: number
  rpe?: number
}

export interface CreateProgramDto {
  name: string
  goal?: string
  description?: string
  isPublic: boolean
}

export const programService = {
  async getMyPrograms() {
    const res = await api.get<ApiResponse<ProgramDto[]>>('/programs')
    return res.data
  },
  async getPublicPrograms() {
    const res = await api.get<ApiResponse<ProgramDto[]>>('/programs/public')
    return res.data
  },
  async getById(id: string) {
    const res = await api.get<ApiResponse<ProgramDto>>(`/programs/${id}`)
    return res.data
  },
  async create(dto: CreateProgramDto) {
    const res = await api.post<ApiResponse<ProgramDto>>('/programs', dto)
    return res.data
  },
  async delete(id: string) {
    const res = await api.delete<ApiResponse<null>>(`/programs/${id}`)
    return res.data
  },
  async clone(id: string) {
    const res = await api.post<ApiResponse<ProgramDto>>(`/programs/${id}/clone`)
    return res.data
  }
}
