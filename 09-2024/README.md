# Zühlke Day: Capture The Flag Event (OWASP Juice Shop)

## Running 10x instances

```bash
docker compose up
```

## Running your own instance

```bash
docker run --rm -e "NODE_ENV=ctf" -p 3000:3000 bkimminich/juice-shop
```

## Find my local IP Address

```bash
ifconfig | grep 'inet ' | grep -v 127.0.0.1
```

## Capture The Flag

See https://ctfd.io/.

```bash
docker run --rm -it -p 8000:8000 ctfd/ctfd
```
