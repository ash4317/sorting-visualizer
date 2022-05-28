"""
Quick sort algo is correct but for large array, res last element is not the sorted array
"""

def swap(arr, i, j):
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp

def partition(arr, start, end, res):
    """correctly places pivot element and returns its index"""
    global count
    i = start - 1
    for j in range(start, end):
        if arr[j] < arr[end]:
            i += 1
            swap(arr, i, j)
            if i != j:
                count += 1
                res[count] = [] + arr + [i, j]
    
    swap(arr, i + 1, end)
    if i + 1 != end:
        count += 1
        res[count] = [] + arr + [i + 1, end]
    return i + 1, res

def quick_sort(arr, start, end, res):
    if start < end:
        #get pivot index of correctly placed pivot
        pivot_index, res = partition(arr, 0, end, res)

        #add array state to result
        

        #call quick_sort on left and right sub arrays
        quick_sort(arr, start, pivot_index - 1, res)
        quick_sort(arr, pivot_index + 1, end, res)

def main(arr):
    res = {1 : [] + arr}
    quick_sort(arr, 0, len(arr) - 1, res)
    return res

count = 1