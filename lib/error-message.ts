export function getErrorMessage(error: unknown): string {
  if (!error) return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

  let message = "";
  let code = "";

  if (error instanceof Error) {
    message = error.message;
    if ("code" in error && typeof error.code === "string") {
      code = error.code;
    }
  } else if (typeof error === "object") {
    const errObj = error as Record<string, unknown>;
    message = String(errObj.message || "");
    code = String(errObj.code || "");
  } else {
    message = String(error);
  }

  if (code === "42501" || message.toLowerCase().includes("row-level security")) {
    return "이 작업을 수행할 권한이 없습니다.";
  }
  if (message.toLowerCase().includes("failed to fetch")) {
    return "인터넷 연결을 확인해주세요.";
  }
  if (message.toLowerCase().includes("not found")) {
    return "요청한 게시글을 찾을 수 없습니다.";
  }

  return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
