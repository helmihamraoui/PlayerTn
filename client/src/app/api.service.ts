import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api'; // Update this as needed

  constructor(private http: HttpClient) {}

  // ========== Auth Routes ==========
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  verifyToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  deleteUserAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getAllOwners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/owners`);
  }

  // ========== Booking Routes ==========
  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings`, data);
  }

  getUserBookings(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings/${userId}`);
  }

  // ========== Chat Routes ==========
  sendMessage(senderId: string, receiverId: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/messages/${senderId}/${receiverId}`, data);
  }

  getMessages(senderId: string, receiverId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages/${senderId}/${receiverId}`);
  }

  getConversations(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/conversations/${userId}`);
  }

  deleteMessage(messageId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/messages/${messageId}`);
  }

  // ========== Owner Routes ==========
  addOwner(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/owner`, data);
  }

  getTerrainsByOwner(ownerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/owner/${ownerId}/terrains`);
  }

  updateOwner(ownerId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/owner/${ownerId}`, data);
  }

  // ========== Player Routes ==========
  addPlayerInfo(userId: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addPlayerInfo/${userId}`, data);
  }

  getPlayerProfile(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/player/profile/${userId}`);
  }

  updatePlayerProfile(userId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/player/profile/${userId}`, data);
  }

  viewOtherPlayer(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/player/view/${id}`);
  }

  // ========== Terrain Routes ==========
  addTerrain(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/terrain`, data);
  }

  deleteTerrain(terrainId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/terrain/${terrainId}`);
  }

  setAvailability(terrainId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/terrain/${terrainId}/availability`, data);
  }
}
