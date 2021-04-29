import socket
import sys
import json
import multiprocessing
from multiprocessing import Manager,Process
import queue
import time


st=''
def check(Input,dic,toBeServed,served,sh):
    start_time = time.time()
    print(Input)
    print("----%s seconds ----" %(time.time() - start_time))
    if not st:
      
      return dic[Input]
    else:
        print("NOPE")
        sh.send(bytes(Input,"utf-8"))
        j=sh.recv(20000).decode()
        print(j)
        dic[Input]=j
        return dic[Input]

def response(conn,dic,toBeServed,served,sh):
    try:
        while True:
            data=conn.recv(20000)
            if((data==bytes("close","utf-8"))or(data==bytes("","utf-8"))):
                print("proc returning")
                conn.close()
                return
            data=data.decode()
            res=check(data,dic,toBeServed,served,sh)
            conn.send(bytes(res,"utf-8"))
    except:
        pass
    finally:
        conn.close()

if __name__=="__main__":

    serv=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    serv.bind(('localhost',6534))
    serv.listen(5)
    print(f"listening on port:6534")
    dic=Manager().dict()
    toBeServed=Manager().Queue()
    served=Manager().Queue()
    while True:
        conn,addr=serv.accept()
        proc=Process(target=response,args=(conn,dic,toBeServed,served,serv))#creating process
        proc.daemon=True
        proc.start()
        # proc.join()
    
    for p in multiprocessing.active_children():
        p.terminate()
        p.join()

