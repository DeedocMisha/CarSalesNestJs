// ПРОВЕРКА ТОКЕНА АДМИНА ОСНОВА
//Для контроллера админа 4 (посл файл)
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => JwtService)) // Используем forwardRef для внедрения JwtService, чтобы избежать проблем с циклическими зависимостями.
    private readonly jwtService: JwtService, // Внедряем JwtService как зависимость.
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Метод canActivate определяет, разрешен ли доступ к маршруту.

    const request = context.switchToHttp().getRequest(); // Получаем объект запроса из контекста выполнения.
    const authHeader = request.headers['authorization']; // Извлекаем заголовок Authorization из заголовков запроса.

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Проверяем, существует ли заголовок и начинается ли он с 'Bearer '.
      throw new UnauthorizedException('Некорректный заголовок Authorization'); // Если нет, выбрасываем исключение о несанкционированном доступе.
    }

    const [, token] = authHeader.split(' '); // Извлекаем токен из заголовка, разделяя строку по пробелу.

    try {
      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // Проверяем токен с помощью метода verify JwtService.
      // Если токен действителен, мы получаем информацию о пользователе из токена, используя секретный ключ (JWT_SECRET или 'Хой!').

      request.user = user; // Добавляем информацию о пользователе в объект запроса.
      return true; // Возвращаем true, чтобы разрешить доступ к маршруту.
    } catch (e) {
      // Если в процессе проверки произошла ошибка, обрабатываем ее.
      if (e.name === 'TokenExpiredError') {
        // Если ошибка связана с истекшим токеном,
        throw new UnauthorizedException('Токен истёк'); // выбрасываем соответствующее исключение.
      } else {
        // Для других типов ошибок,
        throw new UnauthorizedException('Неверный токен'); // выбрасываем исключение о неверном токене.
      }
    }
  }
}
