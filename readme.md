### Enviroment

`.env` içeriği `docker-compose.yml` içeriğiyle aynı olacak şekilde güncellenmeli.

```
PORT=8000
DB_HOST=localhost
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=

MYSQL_DATABASE=
MYSQL_ROOT_PASSWORD=
```

### TODO
- [ ] Validation işlemlerinde sayısal değerlerin kontrolü yeniden yapılmalı.
- [ ] Beğenme ve beğenmeme durumunda toplam sayı hesaplanıp yorum tablosuna yazılmalı.
- [ ] Yıldızların kayıt işleminden sonra yorum tablosundakigüncelleme işlemi tamamlanmalı.
