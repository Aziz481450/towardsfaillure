import api from './api'
import type { ApiResponse } from './authService'

export interface SetDto {
  weight: number
  reps: number
  rpe?: number
  isSuccess: boolean
}

export interface SessionExerciseDto {
  exerciseId: string
  exerciseName: string
  muscleGroup?: string
  sets: SetDto[]
}

export interface SessionDto {
  id: string
  userId: string
  programId?: string
  programName?: string
  date: string
  durationMinutes: number
  exercises: SessionExerciseDto[]
  totalVolume: number
  notes?: string
}

export interface StartSessionDto {
  programId?: string
  programName?: string
}

export interface CompleteSessionDto {
  durationMinutes: number
  notes?: string
  exercises: SessionExerciseDto[]
}

export const workoutService = {
  async startSession(dto: StartSessionDto) {
    const res = await api.post<ApiResponse<SessionDto>>('/workout-sessions', dto)
    return res.data
  },
  async completeSession(id: string, dto: CompleteSessionDto) {
    const res = await api.put<ApiResponse<SessionDto>>(`/workout-sessions/${id}/complete`, dto)
    return res.data
  },
  async getSessions(page = 1, pageSize = 20) {
    const res = await api.get<ApiResponse<SessionDto[]>>(`/workout-sessions?page=${page}&pageSize=${pageSize}`)
    return res.data
  },
  async getById(id: string) {
    const res = await api.get<ApiResponse<SessionDto>>(`/workout-sessions/${id}`)
    return res.data
  }
}
