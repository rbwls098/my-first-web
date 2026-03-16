// TODO: AuthContext 구현
// "use client";
//
// 1. createContext로 AuthContext 생성
// 2. AuthProvider 컴포넌트:
//    - useState로 user, loading 관리
//    - useEffect에서 getUser()로 현재 사용자 확인
//    - onAuthStateChange로 세션 변화 감지
//    - value로 { user, loading, signInWithGoogle, signOut } 제공
// 3. useAuth() 커스텀 Hook 내보내기
