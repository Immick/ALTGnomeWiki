# Citrix Workspace

Citrix Workspace — клиентский компонент XenDesktop и XenApp, разработанный Citrix Systems.

## Получение дистрибутива

Скачать дистрибутив можно с [официального сайта](https://www.citrix.com/downloads/workspace-app/linux/workspace-app-for-linux-latest.html)

::: warning
Приложение не поставляется официально для пользователей находящихся на территории РФ. Обслуживание пользователей приостановлено на неопределённый срок.
:::

## Распаковка и установка

::: tip
Используемая версия на момент написания инструкции: `23.9.0.24`
:::

- Создайте рабочую папку, распакуйте архив в неё и запустите установщик

```shell
mkdir /home/$USER/ICASetup
mv /home/$USER/Загрузки/linuxx64-23.9.0.24.tar.gz /home/$USER/ICASetup
cd /home/$USER/ICASetup
tar xzvf linuxx64-23.9.0.24.tar.gz
./setupwfc
```

- После завершения процесса установки, иконка приложения появится в панели запуска в GNOME
- Далее установщик можно удалить

```shell
rm -r /home/$USER/ICASetup
```

## Если во время установки возникли ошибки

Пример ошибки

```
Настройка разрешений для файла...
cp: невозможно создать обычный файл '/home/user/ICAClient/linuxx64/ceb/CtxChromiumBrowser/thread_type.mojom.m.js': Отказано в доступе
cp: невозможно создать обычный файл '/home/user/ICAClient/linuxx64/bcr/libEGL.so': Отказано в доступе
cp: невозможно создать обычный файл '/home/user/ICAClient/linuxx64/bcr/libGLESv2.so': Отказано в доступе

Failed to disable unit: Unit file ctxcwalogd.service does not exist.
Интеграция с браузерами...
```

::: tip
Перед попыткой разобраться с проблемой, проверьте, работает ли сам Citrix
:::
