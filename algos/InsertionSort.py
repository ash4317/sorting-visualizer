def swap(arr, i, j):
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp

def insertion_sort(arr):
    result = {1 : [] + arr}
    count = 1
    for i in range(1, len(arr)):
        j = i
        while j > 0 and arr[j] < arr[j - 1]:
            swap(arr, j, j - 1)
            count += 1
            result[count] = [] + arr + [j, j - 1]
            j -= 1
    return result