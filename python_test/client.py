import socket

s=socket.socket()
s.connect(('192.168.1.114',6534))

def count(name):
    for i in range(1,30):
        name = name + 'data > ' + str(i) + '\n'
    return name    

name_n = ""


while True:
    data = count(name_n)
    if(data=="close"):
        break
    s.send(bytes(data,"utf-8"))
    d=s.recv(20000)
    d=d.decode()
    if(d==''):
        continue
    print(d)
