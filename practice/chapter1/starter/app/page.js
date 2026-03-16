// Ch1 개인 프로필 페이지 — 스타터 코드
// create-next-app 기본 결과물에서 프로필 뼈대만 남긴 상태이다.
// B회차에서 본인 정보를 채워넣고 Tailwind CSS로 스타일링한다.

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* TODO: 본인 이름으로 변경 */}
      <h1 className="text-4xl font-bold">이름을 입력하세요</h1>

      {/* TODO: 한 줄 자기소개 작성 */}
      <p className="mt-4 text-xl text-gray-600">
        여기에 자기소개를 작성하세요
      </p>
    </main>
  );
}
