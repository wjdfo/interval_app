import time
import os

step = [1,2,1]

for currentStep in step :
    m, s = currentStep, 0

    while m > 0 or s > 0 :
        print(f"{m} : {s}", end = " ")

        if s <= 0 : # case : s == 0 and ms == 0
            if m > 0 :
                m -= 1
                s += 60

        if m == 0 :
            if s < 6 :
                print("시간이 얼마 안남음", end = "")

        print()
        time.sleep(0.9)
        os.system("cls")
        s -= 1