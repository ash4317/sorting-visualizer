def merge(arr, start, end, mid, res):
    """Merge two sorted arrays into a sorted array"""
    global count

    #add the sorted elements of right and left halves into arr2 and arr1
    arr1, arr2 = [], []
    for i in range(start, mid + 1):
        arr1.append(arr[i])
    for i in range(mid + 1, end + 1):
        arr2.append(arr[i])

    i, j, k = 0, 0, start

    #merge into original array
    while i < len(arr1) and j < len(arr2):
        if arr1[i] < arr2[j]:
            arr[k] = arr1[i]
            i += 1
        else:
            arr[k] = arr2[j]
            j += 1
        k += 1
        count += 1
        res[count] = [] + arr + [k]

    while i < len(arr1):
        arr[k] = arr1[i]
        k += 1
        i += 1
        count += 1
        res[count] = [] + arr + [k]

    while j < len(arr2):
        arr[k] = arr2[j]
        k += 1
        j += 1
        count += 1
        res[count] = [] + arr + [k]

def merge_sort(arr, start, end, res):
    """Call merge sort on left and right halves and then merge sorted arrays"""
    if start < end:
        mid = start + (end - start) // 2
        merge_sort(arr, start, mid, res)
        merge_sort(arr, mid + 1, end, res)
        merge(arr, start, end, mid, res)

def main(arr):
    res = {1 : [] + arr}
    merge_sort(arr, 0, len(arr) - 1, res)
    return res

count = 1