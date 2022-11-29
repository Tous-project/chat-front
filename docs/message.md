# 메시지 객체 정의

## 기본 포멧

```typescript
type Message {
    id: string,  // 메시지 고유 ID (uuid 형태로 자동 생성)
    type: MessageType,  // 메시지 타입
    sender: User,  // 유저 정보
    receiver: MessageReceiverType,  // 메시지 수신자 타입 (system or user)
    reader: number[],  // 해당 메시지를 읽은 사용자 아이디
    timestamp: number,  // 메시지를 보낸 시간 (timestamp 형태로 자동 생성)
    text: string,  // 보낼 메시지 문자열
    target_message_id: string,  // 대상 메시지 아이디 (추후 메시지 수정 기능을 위한 용도, 현재는 사용하지 않음)
}
```

## 타입 정의

```typescript
const enum MessageType {
    SEND = "send",  // 사용자가 메시지를 보낼때
    READ = "read",  // 사용자가 메시지를 읽었을때
    NOTIFICATION = "notification",  // 서버에서 사용자 알림을 보낼때
    SYSTEM = "system",  // 특수 목적으로 서버 혹은 관리자가 메시지를 보낼때
}

const enum MessageReceiverType {
    USER = "user",  // 수신자가 사용자일 경우
    SYSTEM = "system",  // 수신자가 서버일 경우
}
```

## 클라이언트에서의 메시지 형식

1. 사용자가 메시지 전송을 눌러서 서버로 전송될때의 형식

    ```typescript
    const userMessage = {
        "type": "send",
        "receiver": "user",
        "sender": {
            "id": 1,
            "name": "gildong",
            "email": "gildong@gmail.com"
        },
        "text": "안녕하세요."
    }
    ```

1. 사용자가 보낸 메시지를 서버에서 수신하고 다른 사용자에게 broadcast할 때의 형식

    ```typescript
    const receiveMessage = {
        "id": "4d2bf801-946f-466a-97fb-9409b79af663",
        "type": "send",
        "receiver": "user",
        "sender": {
            "id": 1,
            "name": "gildong",
            "email": "gildong@gmail.com"
        },
        "text": "안녕하세요.",
        "timestamp": 1669730189.30946
    }
    ```

1. 사용자 접속 및 퇴장 등 서버의 알림 메시지 형식

    ```typescript
    const welcomeMessage = {
        "id": "4d2bf801-946f-466a-97fb-9409b79af663",
        "type": "notification",
        "receiver": "user",
        "sender": {
            "id": 0,
            "name": "system",
            "email": "system@gmail.com"
        },
        "text": "Gildong님이 입장하셨습니다.",
        "timestamp": 1669730189.30946
    }
    ```
